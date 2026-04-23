# Insurgo Hermes Ops Notes (Render)

This note tracks the minimum operations model for the Hermes WhatsApp runtime.
The repository-level Render blueprint is [`render.yaml`](../render.yaml), which
deploys both:

- Static site from [`app new`](./app new)
- Hermes WhatsApp worker from [`whatsapp-bridge/hermes`](./whatsapp-bridge/hermes)

## Service identity

- Service: `insurgo-hermes-gateway`
- Host: Render
- Runtime mode: single instance until stability gates pass
- Persistent disk: `/var/lib/hermes`

## Secrets and env ownership

- `OPENROUTER_API_KEY`: owner-managed secret in Render
- `HERMES_ADMIN_E164=+92333728901`: owner admin override identity
- `WHATSAPP_ALLOWED_USERS`: optional operator allowlist in Render
- `GATEWAY_ALLOW_ALL_USERS=true`: public ingress is enabled; safety is enforced by restricted public toolset

## Role routing

- Admin mode: sender `+92333728901` receives full operational toolset.
- Public mode: all other senders are restricted to discovery-safe tools only.
- Unknown/public senders must never receive shell/filesystem/arbitrary exec tools.
- Public/admin tool boundaries are defined in
  [`whatsapp-bridge/hermes/public-admin-tool-policy.md`](./whatsapp-bridge/hermes/public-admin-tool-policy.md).

## Runtime commands

- Pairing: `hermes whatsapp` (one-time and re-pair fallback)
- Start gateway: `hermes gateway start`
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
