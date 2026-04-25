# Insurgo Hermes Ops Notes (Render)

This note tracks the minimum operations model for the Hermes WhatsApp runtime.
The repository-level Render blueprint is [`render.yaml`](../render.yaml), which
deploys both:

- Static site from [`app new`](./app new) (under `Live/`)
- Hermes WhatsApp worker from [`whatsapp-bridge/hermes`](./whatsapp-bridge/hermes)

## Service identity

- Service: `insurgo-hermes-gateway`
- Host: Render
- Runtime mode: single instance until stability gates pass
- Persistent disk: `/var/lib/hermes`

## Secrets and env ownership

- `OPENROUTER_API_KEY`: owner-managed secret in Render
- `HERMES_ADMIN_E164=+923333728901`: owner admin override identity
- `WHATSAPP_ALLOWED_USERS`: optional operator allowlist in Render
- `GATEWAY_ALLOW_ALL_USERS=true`: public ingress is enabled. **Target** safety is a restricted public toolset (see policy below); **actual** lockdown is whatever Hermes tool configuration + allowlist/pairing you have enabled — not automatic from this env var alone

## Role routing

- Admin mode: sender `+923333728901` receives full operational toolset.
- Public mode: all other senders should be limited to discovery-safe behavior (enforce via `hermes tools` when possible).
- Unknown/public senders must never receive shell/filesystem/arbitrary exec tools in production.
- Public/admin **target** boundaries: [`whatsapp-bridge/hermes/public-admin-tool-policy.md`](./whatsapp-bridge/hermes/public-admin-tool-policy.md).
- WhatsApp **agent persona / system prompt** (v1.1): [`whatsapp-bridge/hermes/insurgo-system-prompt-v1.1.md`](./whatsapp-bridge/hermes/insurgo-system-prompt-v1.1.md) — copy the SYSTEM block onto the worker into Hermes’s configured persona location (e.g. `SOUL` / config under `XDG_CONFIG_HOME`); then restart gateway or start a new session.

## Runtime commands

- Pairing: `hermes whatsapp` (one-time and re-pair fallback)
- Start gateway: `hermes gateway` (foreground; use in containers — `hermes gateway start` requires systemd/launchd)
- Model selection: `hermes model`
- Fallback one-off: set `HERMES_ONE_OFF_COMMAND="hermes whatsapp"` and redeploy once
- Pause mode: set `HERMES_PAUSE_START=true` for temporary shell-first troubleshooting

## Incident playbook (minimum)

1. Confirm service health from Render logs.
2. Restart service once.
3. Validate inbound and outbound message loop.
4. If session invalid, re-run pairing.
5. Verify WhatsApp Business app remains logged in.

## Scale guardrails

- Do not run multiple instances in Phase 1.
- Do not enable MemPalace writes until Phase 2 acceptance criteria are met.
