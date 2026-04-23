import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import qrcode from 'qrcode';
import makeWASocket, {
  DisconnectReason,
  fetchLatestWaWebVersion,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';

const PORT = Number(process.env.PORT || process.env.WA_BRIDGE_PORT || 8787);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
const AUTH_DIR = process.env.WA_AUTH_DIR || './auth';
const WEBHOOK_URL = process.env.WA_INBOUND_WEBHOOK_URL || '';

const app = express();
app.use(
  cors({
    origin: FRONTEND_ORIGIN === '*' ? true : FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));

let sock = null;
let currentQr = null;
let connected = false;
let reconnecting = false;
let lastConnectionError = null;
let currentJid = null;

const sseClients = new Set();

function pushSse(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    client.write(payload);
  }
}

function toJid(to) {
  const value = String(to || '').trim();
  if (!value) return '';
  if (value.includes('@')) return value;
  const digits = value.replace(/[^\d]/g, '');
  if (!digits) return '';
  return `${digits}@s.whatsapp.net`;
}

function getStatusPayload() {
  return {
    connected,
    reconnecting,
    jid: currentJid,
    hasQr: Boolean(currentQr),
    lastConnectionError,
  };
}

async function startSocket({ force = false } = {}) {
  if (sock && !force) return sock;

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestWaWebVersion();

  sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: true,
    syncFullHistory: false,
    browser: ['Insurgo WhatsApp Bridge', 'Desktop', '1.0.0'],
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      currentQr = qr;
      pushSse('qr', { hasQr: true });
    }

    if (connection === 'open') {
      connected = true;
      reconnecting = false;
      currentQr = null;
      currentJid = sock.user?.id || null;
      lastConnectionError = null;
      pushSse('status', getStatusPayload());
      return;
    }

    if (connection === 'close') {
      connected = false;
      currentJid = null;
      const code = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = code !== DisconnectReason.loggedOut;
      lastConnectionError = code ? `disconnect:${code}` : 'disconnect:unknown';
      pushSse('status', getStatusPayload());

      if (shouldReconnect) {
        reconnecting = true;
        setTimeout(() => {
          startSocket({ force: true }).catch((err) => {
            lastConnectionError = String(err?.message || err);
          });
        }, 1500);
      } else {
        reconnecting = false;
      }
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify' || !Array.isArray(messages)) return;

    for (const msg of messages) {
      const text =
        msg?.message?.conversation ||
        msg?.message?.extendedTextMessage?.text ||
        '';
      const from = msg?.key?.remoteJid;

      if (!text || !from) continue;

      pushSse('inbound', { from, text });

      if (WEBHOOK_URL) {
        try {
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              from,
              text,
              timestamp: Date.now(),
            }),
          });
        } catch {
          // Keep bridge alive even if webhook target is down.
        }
      }
    }
  });

  return sock;
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'insurgo-whatsapp-bridge' });
});

app.get('/status', (_req, res) => {
  res.json(getStatusPayload());
});

app.post('/connect', async (_req, res) => {
  try {
    await startSocket({ force: !sock });
    res.json({ ok: true, ...getStatusPayload() });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.get('/qr', async (_req, res) => {
  if (!currentQr) {
    return res.status(404).json({ error: 'QR not available right now' });
  }
  try {
    const dataUrl = await qrcode.toDataURL(currentQr, { margin: 1, scale: 8 });
    res.json({ hasQr: true, dataUrl });
  } catch (err) {
    res.status(500).json({ error: String(err?.message || err) });
  }
});

app.post('/send', async (req, res) => {
  try {
    const to = toJid(req.body?.to);
    const text = String(req.body?.text || '').trim();

    if (!to) return res.status(400).json({ error: 'to is required' });
    if (!text) return res.status(400).json({ error: 'text is required' });
    if (!sock || !connected) {
      return res.status(409).json({ error: 'WhatsApp is not connected' });
    }

    const out = await sock.sendMessage(to, { text });
    res.json({ ok: true, messageId: out?.key?.id || null, to });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseClients.add(res);
  res.write(`event: status\ndata: ${JSON.stringify(getStatusPayload())}\n\n`);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

startSocket().catch((err) => {
  lastConnectionError = String(err?.message || err);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`WhatsApp bridge listening on http://localhost:${PORT}`);
});
