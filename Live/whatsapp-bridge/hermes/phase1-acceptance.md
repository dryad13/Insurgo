# Phase 1 Acceptance Checklist

Run these checks before any MemPalace integration.

## A) Core message loop

- [ ] Pairing completed via `hermes whatsapp`
- [ ] Gateway running via `hermes gateway start`
- [ ] Inbound WhatsApp message receives outbound AI reply
- [ ] 20+ consecutive message exchanges complete successfully

## B) Latency and stability

- [ ] Median latency recorded over at least 20 messages
- [ ] No stuck jobs in logs during test window
- [ ] No dropped replies in test window

Suggested message script:

1. "health ping 01"
2. "health ping 02"
3. Continue to "health ping 20"

## C) Recovery tests

- [ ] Restart Render service
- [ ] Confirm Hermes resumes without re-pair
- [ ] Confirm WhatsApp session continuity (still linked)

## D) Linked-device safety tests

- [ ] WhatsApp Business app remains logged in after first pairing
- [ ] WhatsApp Business app remains logged in after restart
- [ ] WhatsApp Business app remains logged in after 24h soak

## E) Security sanity

- [ ] `GATEWAY_ALLOW_ALL_USERS=true` for public ingress
- [ ] `HERMES_ADMIN_E164=+92333728901` is set
- [ ] Unknown number can chat in public mode but does not receive privileged behavior
- [ ] Admin number receives full-admin behavior
- [ ] Prompt-injection tests do not unlock restricted tools for public users

## Exit criteria

Proceed to Phase 2 only when all checkboxes are complete.
