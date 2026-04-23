# Hermes + OpenRouter + WhatsApp on Render

This runbook is the production path for Insurgo's Phase 1 rollout.

## Scope

- Use Hermes native WhatsApp gateway (Hermes internally uses a Baileys-based session layer).
- Use OpenRouter as the model provider.
- Deploy on Render with persistent storage for WhatsApp session state.
- Keep existing legacy bridge untouched during this phase.
- Run with open public ingress and role-based tool restrictions.

## Prerequisites

- Render account and project
- OpenRouter API key
- WhatsApp number to pair (Insurgo: `+1 686 204-6914`)
- Admin phone (Pakistan master): `+92333728901`

## 1) Render service setup

Use Render Blueprint with root [`render.yaml`](../../render.yaml)
for both website and Hermes worker, or use local [`render.yaml`](./render.yaml)
for Hermes-only provisioning, or create the service manually:

- Runtime: Docker
- Disk: mounted at `/var/lib/hermes`
- Instances: `1` (single instance until session stability is proven)
- Health check: process-level/log-based (WhatsApp messaging has no simple public probe endpoint by default)

## 2) Environment variables

Start from [`./.env.render.example`](./.env.render.example) and set real values in Render:

- `OPENROUTER_API_KEY`
- `WHATSAPP_ENABLED=true`
- `GATEWAY_ALLOW_ALL_USERS=true` (open public ingress)
- `HERMES_ADMIN_E164=+92333728901` (admin override)
- `WHATSAPP_ALLOWED_USERS` optional (admins/operators only when needed)
- `HERMES_HOME`
- `XDG_CONFIG_HOME`

Role behavior:

- Unknown/public numbers: restricted discovery toolset only.
- `+92333728901`: full admin toolset.
- Any extra numbers in allowlist: operator access as explicitly configured.
- Policy source of truth: [`public-admin-tool-policy.md`](./public-admin-tool-policy.md)

## 3) First boot and pairing

After deploy, run one-time pairing from Render shell:

```bash
hermes whatsapp
```

Then complete QR/device pairing from WhatsApp Business.

Important safety behavior:

- Pair Hermes as a linked device session.
- Do not re-register the WhatsApp number on a new primary device.

## 4) Start messaging gateway

Use:

```bash
hermes gateway start
```

Once running, send a test message from the allowed number and confirm response.

## 5) OpenRouter model selection

Run:

```bash
hermes model
```

Choose provider/model via OpenRouter and pin a known-stable model for Phase 1.

## 6) Ops controls (minimum)

- Restart command: Render service restart
- Logs: Render logs + Hermes runtime output
- Recovery: verify session survives restart (see acceptance checklist)

## 7) Non-goals in Phase 1

- No MemPalace write-path integration yet
- No autonomy beyond defined public/admin tool matrix
- No multi-instance gateway scaling

## 8) Promotion gate to Phase 2

Phase 1 must pass all checks in [`phase1-acceptance.md`](./phase1-acceptance.md).
