# Insurgo WhatsApp Bridge (Baileys)

This service keeps a persistent WhatsApp Web session using Baileys and exposes
a small REST API your Netlify app can proxy to.

## Why this exists

Baileys requires a long-running process with local auth state. Netlify
Functions are ephemeral, so the session must live outside Netlify.

## Endpoints

- `GET /health`
- `GET /status`
- `POST /connect`
- `GET /qr`
- `POST /send` with `{ "to": "+447...", "text": "..." }`
- `GET /events` (SSE)

## Local run

```bash
cd "whatsapp-bridge"
npm install
cp .env.example .env
npm run dev
```

Then in another terminal:

```bash
cd "app new"
npx netlify-cli dev
```

Your app hits `/api/whatsapp-*`; Netlify proxies to this bridge.

## Environment

- `WA_BRIDGE_PORT` default `8787`
- `FRONTEND_ORIGIN` default `*` (set this in production)
- `WA_AUTH_DIR` default `./auth`
- `WA_INBOUND_WEBHOOK_URL` optional (for inbound message forwarding)

## Production notes

- Persist the `auth/` directory across restarts.
- Restrict network access to bridge endpoints.
- Do not expose bridge directly to the public internet without auth.
- Baileys is unofficial; evaluate compliance risk for business-critical usage.
