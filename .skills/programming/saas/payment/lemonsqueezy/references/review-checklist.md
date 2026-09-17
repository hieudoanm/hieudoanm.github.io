# Review checklist

Focused reference for **lemonsqueezy**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **LS is the MoR** — tax and invoicing are their problem, entitlements are yours
- **Webhooks drive state** — verify, dedup, react to paid/active events
- **Correlate with custom data** — webhooks must map back to your users
- **Server-side truth, off-path sending** — never trust client callbacks

---

## Quick-Start Checklist

- [ ] Products/variants defined; checkout + `custom` correlation in place
- [ ] Webhook signatures verified (HMAC on raw body); events deduped
- [ ] Entitlement granted on paid/active; revoked on cancel/expiry/refund
- [ ] License keys validated server-side where online
- [ ] Order/subscription IDs persisted for reconciliation
- [ ] Sandbox vs production separated; webhook secret server-side
- [ ] Webhook failures, churn, refund rates monitored
- [ ] MoR model used (no custom tax logic)
