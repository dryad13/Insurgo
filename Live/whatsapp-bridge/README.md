# Insurgo WhatsApp Runtime

This directory now supports two tracks:

- **Primary track (active plan):** Hermes + OpenRouter + WhatsApp on Render.
- **Legacy/fallback track:** custom Baileys REST bridge (`src/server.js`).

The current rollout is intentionally "hardware before software":
first stabilize transport/runtime, then layer memory/governance.

## Primary track: Hermes + OpenRouter + WhatsApp (Render)

Use the runbook files in [`hermes/`](./hermes):

- [`hermes/README.md`](./hermes/README.md): deployment and operations runbook
- [`hermes/.env.render.example`](./hermes/.env.render.example): Render env template
- [`hermes/render.yaml`](./hermes/render.yaml): Render Blueprint starter
- [`hermes/phase1-acceptance.md`](./hermes/phase1-acceptance.md): reliability gates
- [`hermes/mempalace-phase2.md`](./hermes/mempalace-phase2.md): phase 2 memory integration

## Legacy track: custom Baileys bridge

This service keeps a persistent WhatsApp Web session using Baileys and exposes
a small REST API your Netlify app can proxy to.

### Why this exists

Baileys requires a long-running process with local auth state. Netlify
Functions are ephemeral, so the session must live outside Netlify.

### Endpoints

- `GET /health`
- `GET /status`
- `POST /connect`
- `GET /qr`
- `POST /send` with `{ "to": "+447...", "text": "..." }`
- `GET /events` (SSE)

### Local run (legacy bridge)

```bash
cd "Live/whatsapp-bridge"
npm install
cp .env.example .env
npm run dev
```

Then in another terminal:

```bash
cd "Live/app new"
npx netlify-cli dev
```

Your app hits `/api/whatsapp-*`; Netlify proxies to this bridge.

### Legacy environment

- `WA_BRIDGE_PORT` default `8787`
- `FRONTEND_ORIGIN` default `*` (set this in production)
- `WA_AUTH_DIR` default `./auth`
- `WA_INBOUND_WEBHOOK_URL` optional (for inbound message forwarding)

### Legacy production notes

- Persist the `auth/` directory across restarts.
- Restrict network access to bridge endpoints.
- Do not expose bridge directly to the public internet without auth.
- Baileys is unofficial; evaluate compliance risk for business-critical usage.
