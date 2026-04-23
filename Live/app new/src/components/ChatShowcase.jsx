import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../content.js';

const viewOnce = { once: true, margin: '-80px 0px' };

// Endpoint served by netlify/functions/chat.js (redirected from /api/chat).
// Falls back to the mocked sampleResponse if the endpoint errors or is not
// reachable (e.g. running `vite dev` alone without `netlify dev`).
const CHAT_ENDPOINT = '/api/chat';
const WA_BRIDGE_BASE = (import.meta.env.VITE_WA_BRIDGE_URL || '').replace(/\/+$/, '');
const WHATSAPP_CONTACT_NUMBER = '+16862046914';
const WHATSAPP_CONTACT_E164 = '16862046914';
const CHAT_SESSION_STORAGE_KEY = 'insurgo.chat.session.v1';
const CHAT_SUMMARY_STORAGE_KEY = 'insurgo.chat.summary.v1';
const CHAT_MESSAGES_STORAGE_KEY = 'insurgo.chat.messages.v1';
const CHAT_SESSION_ID_PREFIX = 'ins-';

function getWaEndpoint(path) {
  if (WA_BRIDGE_BASE) return `${WA_BRIDGE_BASE}${path}`;
  // Backward-compatible fallback for Netlify function proxies.
  const legacyMap = {
    '/status': '/api/whatsapp-status',
    '/connect': '/api/whatsapp-connect',
    '/qr': '/api/whatsapp-qr',
    '/send': '/api/whatsapp-send',
  };
  return legacyMap[path] || path;
}

function isEditableElement(el) {
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    el.isContentEditable
  );
}

function generateSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${CHAT_SESSION_ID_PREFIX}${crypto.randomUUID()}`;
  }
  return `${CHAT_SESSION_ID_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function summarizeForWhatsapp(messages, sessionId) {
  const recent = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content.trim())
    .slice(-6);

  const userTurns = recent.filter((m) => m.role === 'user').map((m) => m.content.trim());
  const assistantTurns = recent.filter((m) => m.role === 'assistant').map((m) => m.content.trim());

  const lastUser = userTurns[userTurns.length - 1] || '';
  const lastAssistant = assistantTurns[assistantTurns.length - 1] || '';

  const userSummary = lastUser ? `I was discussing: ${lastUser}` : '';
  const aiSummary = lastAssistant ? `The Insurgo AI suggested: ${lastAssistant}` : '';

  const summaryBody = [userSummary, aiSummary]
    .filter(Boolean)
    .join(' ');

  const fallback =
    'Hi Insurgo, I was reviewing your website and want to discuss how your systems could help my business.';

  const summaryText = summaryBody || fallback;
  return `${summaryText}\n\nSession ID: ${sessionId}`;
}

export default function ChatShowcase() {
  const { eyebrow, title, intro, placeholder, prompts, sampleResponse } = CONTENT.chat;
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [errorNote, setErrorNote] = useState(null);
  const abortRef = useRef(null);
  const inputRef = useRef(null);
  const [isWaAdmin, setIsWaAdmin] = useState(false);
  const [waStatus, setWaStatus] = useState(null);
  const [waQr, setWaQr] = useState('');
  const [waTo, setWaTo] = useState('');
  const [waText, setWaText] = useState('');
  const [waBusy, setWaBusy] = useState(false);
  const [waNote, setWaNote] = useState('');
  const [contactWaBusy, setContactWaBusy] = useState(false);
  const [contactWaNote, setContactWaNote] = useState('');
  const [chatSessionId, setChatSessionId] = useState('');
  const hasHydratedStorage = useRef(false);

  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setIsWaAdmin(params.get('waAdmin') === '1');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingSessionId = window.localStorage.getItem(CHAT_SESSION_STORAGE_KEY);
    const resolvedSessionId = existingSessionId || generateSessionId();
    if (!existingSessionId) {
      window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, resolvedSessionId);
    }
    setChatSessionId(resolvedSessionId);

    const storedMessagesRaw = window.localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);
    if (storedMessagesRaw) {
      try {
        const parsed = JSON.parse(storedMessagesRaw);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch {
        // Ignore malformed storage payloads and start fresh.
      }
    }

    hasHydratedStorage.current = true;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasHydratedStorage.current) return;
    const compactMessages = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-20);
    window.localStorage.setItem(CHAT_MESSAGES_STORAGE_KEY, JSON.stringify(compactMessages));

    if (!chatSessionId) return;
    const summary = summarizeForWhatsapp(compactMessages, chatSessionId);
    window.localStorage.setItem(CHAT_SUMMARY_STORAGE_KEY, summary);
  }, [messages, chatSessionId]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key?.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isEditableElement(e.target)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function setAssistantContent(messageId, nextContent) {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, content: nextContent } : m)),
    );
  }

  function appendAssistantDelta(messageId, delta) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, content: `${m.content}${delta}` } : m,
      ),
    );
  }

  async function readStreamToAssistant(response, assistantId) {
    if (!response.body) throw new Error('missing stream body');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let receivedAnyText = false;

    while (true) {
      const { value: chunk, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(chunk, { stream: true });

      let eventBoundary = buffer.indexOf('\n\n');
      while (eventBoundary !== -1) {
        const eventBlock = buffer.slice(0, eventBoundary);
        buffer = buffer.slice(eventBoundary + 2);
        const dataLine = eventBlock
          .split('\n')
          .find((line) => line.startsWith('data:'));

        if (dataLine) {
          const dataPayload = dataLine.slice(5).trim();
          if (dataPayload === '[DONE]') {
            return receivedAnyText;
          }
          try {
            const parsed = JSON.parse(dataPayload);
            if (typeof parsed.delta === 'string' && parsed.delta.length > 0) {
              receivedAnyText = true;
              setIsThinking(false);
              appendAssistantDelta(assistantId, parsed.delta);
            }
          } catch {
            // Ignore malformed event payloads from upstream relays.
          }
        }
        eventBoundary = buffer.indexOf('\n\n');
      }
    }

    return receivedAnyText;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: v,
    };
    const assistantId = `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const priorHistory = messages
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content.trim())
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: 'assistant', content: '' },
    ]);
    setValue('');
    setErrorNote(null);
    setIsThinking(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: v,
          history: priorHistory,
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        const streamed = await readStreamToAssistant(res, assistantId);
        if (!streamed) throw new Error('empty stream');
      } else {
        const data = await res.json();
        if (!data?.reply) throw new Error('empty reply');
        setIsThinking(false);
        setAssistantContent(assistantId, data.reply);
      }
    } catch (err) {
      if (err?.name === 'AbortError') return;
      // Graceful fallback so the demo never shows a broken state.
      setAssistantContent(assistantId, sampleResponse);
      setErrorNote('Live endpoint unreachable — showing a sample response.');
    } finally {
      setIsThinking(false);
    }
  }

  function handlePrompt(p) {
    setValue(p);
  }

  async function refreshWaStatus() {
    try {
      const res = await fetch(getWaEndpoint('/status'));
      const data = await res.json();
      setWaStatus(data);
      return data;
    } catch (err) {
      setWaNote(`Status check failed: ${String(err?.message || err)}`);
      return null;
    }
  }

  async function handleWaConnect() {
    setWaBusy(true);
    setWaNote('');
    try {
      const res = await fetch(getWaEndpoint('/connect'), { method: 'POST' });
      const data = await res.json();
      setWaStatus(data);
      if (!res.ok) {
        setWaNote(data?.error || 'Failed to connect');
      } else {
        setWaNote(data?.connected ? 'WhatsApp connected.' : 'Connection started. Fetching QR...');
      }
      if (!data?.connected) {
        await handleWaQr();
      }
    } catch (err) {
      setWaNote(`Connect failed: ${String(err?.message || err)}`);
    } finally {
      setWaBusy(false);
    }
  }

  async function handleWaQr() {
    setWaBusy(true);
    setWaNote('');
    try {
      const res = await fetch(getWaEndpoint('/qr'));
      const data = await res.json();
      if (!res.ok) {
        setWaQr('');
        setWaNote(data?.error || 'QR unavailable');
        return;
      }
      setWaQr(data?.dataUrl || '');
      setWaNote(data?.dataUrl ? 'Scan this QR with WhatsApp Business.' : 'QR unavailable');
    } catch (err) {
      setWaNote(`QR fetch failed: ${String(err?.message || err)}`);
    } finally {
      setWaBusy(false);
    }
  }

  async function handleWaSend() {
    const text = waText.trim();
    const to = waTo.trim();
    if (!to || !text) {
      setWaNote('Both phone number and message are required.');
      return;
    }
    setWaBusy(true);
    setWaNote('');
    try {
      const res = await fetch(getWaEndpoint('/send'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setWaNote(data?.error || 'Send failed');
        return;
      }
      setWaNote(`Sent to ${data?.to || to}.`);
    } catch (err) {
      setWaNote(`Send failed: ${String(err?.message || err)}`);
    } finally {
      setWaBusy(false);
    }
  }

  async function handleContactViaWhatsApp() {
    const sessionId = chatSessionId || generateSessionId();
    if (!chatSessionId && typeof window !== 'undefined') {
      window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, sessionId);
      setChatSessionId(sessionId);
    }

    const storedSummary =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(CHAT_SUMMARY_STORAGE_KEY) || ''
        : '';
    const summaryText = storedSummary || summarizeForWhatsapp(messages, sessionId);
    const deeplink = `https://wa.me/${WHATSAPP_CONTACT_E164}?text=${encodeURIComponent(summaryText)}`;

    setContactWaBusy(true);
    setContactWaNote('');
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CHAT_SUMMARY_STORAGE_KEY, summaryText);
        window.open(deeplink, '_blank', 'noopener,noreferrer');
      }
      setContactWaNote(`Opening WhatsApp for ${WHATSAPP_CONTACT_NUMBER} with your editable summary.`);
    } catch (err) {
      setContactWaNote(`Could not open WhatsApp deeplink: ${String(err?.message || err)}`);
    } finally {
      setContactWaBusy(false);
    }
  }

  useEffect(() => {
    if (!isWaAdmin) return;
    refreshWaStatus();
  }, [isWaAdmin]);

  return (
    <section id="contact" className="section">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-heading">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.div>
          <motion.h2
            className="display"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="body-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ color: 'var(--text-tertiary)' }}
          >
            {intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 0.6 }}
          style={{
            padding: 20,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-standard)',
            borderRadius: 'var(--r-panel)',
            boxShadow: 'var(--shadow-dialog)',
          }}
        >
          {/* Transcript */}
          <div
            style={{
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 12,
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: 12,
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: isUser ? '80%' : '92%',
                      padding: '10px 14px',
                      background: isUser ? 'var(--accent-tint)' : 'rgba(255,255,255,0.03)',
                      border: isUser
                        ? '1px solid var(--border-accent)'
                        : '1px solid var(--border-standard)',
                      borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      fontSize: 14,
                      color: isUser ? 'var(--text-primary)' : 'var(--text-secondary)',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.55,
                    }}
                  >
                    {m.content}
                  </motion.div>
                );
              })}

              {isThinking && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-standard)',
                    borderRadius: '14px 14px 14px 2px',
                    display: 'inline-flex',
                    gap: 4,
                  }}
                  aria-label="System is thinking"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--text-tertiary)',
                      }}
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {messages.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mono"
                  style={{
                    alignSelf: 'center',
                    color: 'var(--text-quaternary)',
                    fontSize: 12,
                    marginTop: 32,
                    textAlign: 'center',
                  }}
                >
                  Transcript will appear here
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggested prompts */}
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}
            aria-label="Suggested prompts"
          >
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                className="pill"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePrompt(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="chat-form"
            style={{ display: 'flex', gap: 8 }}
          >
            <label className="sr-only" htmlFor="chat-input">
              {placeholder}
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              className="input"
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn btn-primary btn-arrow"
              disabled={!value.trim() || isThinking}
              style={{
                opacity: !value.trim() || isThinking ? 0.6 : 1,
                cursor: !value.trim() || isThinking ? 'not-allowed' : 'pointer',
              }}
            >
              Send
            </button>
          </form>

          <div
            style={{
              marginTop: 10,
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleContactViaWhatsApp}
              disabled={contactWaBusy}
            >
              Contact on WhatsApp
            </button>
          </div>
          {contactWaNote && (
            <p
              className="mono"
              style={{
                marginTop: 8,
                fontSize: 11,
                color: 'var(--text-quaternary)',
              }}
            >
              {contactWaNote}
            </p>
          )}
          {chatSessionId && (
            <p
              className="mono"
              style={{
                marginTop: 6,
                fontSize: 11,
                color: 'var(--text-quaternary)',
              }}
            >
              Session context ID: {chatSessionId}
            </p>
          )}

          <p
            className="mono"
            style={{
              marginTop: 8,
              fontSize: 11,
              color: 'var(--text-quaternary)',
            }}
          >
            Shortcut: <span className="tabular">/</span> or <span className="tabular">Ctrl/Cmd + K</span>
          </p>
        </motion.div>

        <p
          className="mono"
          style={{
            marginTop: 12,
            fontSize: 11,
            color: errorNote ? 'var(--accent-active)' : 'var(--text-quaternary)',
            textAlign: 'center',
          }}
        >
          {errorNote
            ? errorNote
            : 'Public demo · responses may take a moment to generate.'}
        </p>

        {isWaAdmin && (
          <div
            style={{
              marginTop: 20,
              padding: 14,
              border: '1px solid var(--border-standard)',
              borderRadius: 'var(--r-card)',
              background: 'rgba(255,255,255,0.015)',
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
              }}
            >
              WhatsApp Admin (waAdmin=1)
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
              <button type="button" className="btn btn-ghost" onClick={refreshWaStatus} disabled={waBusy}>
                Refresh status
              </button>
              <button type="button" className="btn btn-primary" onClick={handleWaConnect} disabled={waBusy}>
                Connect / Reconnect
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleWaQr} disabled={waBusy}>
                Get QR
              </button>
            </div>

            <p className="mono" style={{ marginTop: 10, fontSize: 11, color: 'var(--text-quaternary)' }}>
              {waStatus
                ? `connected=${Boolean(waStatus.connected)} hasQr=${Boolean(waStatus.hasQr)} jid=${
                    waStatus.jid || 'n/a'
                  }`
                : 'status unavailable'}
            </p>

            {waQr && (
              <img
                src={waQr}
                alt="WhatsApp QR"
                style={{
                  width: 220,
                  maxWidth: '100%',
                  borderRadius: 8,
                  border: '1px solid var(--border-standard)',
                  background: '#fff',
                  padding: 8,
                }}
              />
            )}

            <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
              <input
                className="input"
                placeholder="Recipient number (e.g. +447xxxxxxxxx)"
                value={waTo}
                onChange={(e) => setWaTo(e.target.value)}
              />
              <textarea
                className="input"
                placeholder="Message to send via WhatsApp"
                value={waText}
                onChange={(e) => setWaText(e.target.value)}
                rows={3}
                style={{ resize: 'vertical' }}
              />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    const lastAssistant = [...messages]
                      .reverse()
                      .find((m) => m.role === 'assistant' && m.content.trim());
                    if (lastAssistant) setWaText(lastAssistant.content);
                  }}
                  disabled={waBusy}
                >
                  Use last AI reply
                </button>
                <button type="button" className="btn btn-primary" onClick={handleWaSend} disabled={waBusy}>
                  Send WhatsApp message
                </button>
              </div>
            </div>

            {waNote && (
              <p className="mono" style={{ marginTop: 10, fontSize: 11, color: 'var(--text-quaternary)' }}>
                {waNote}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
