# Review checklist

Focused reference for **dodopayments**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Server-side checkout creation, verified webhooks** — the payment pattern
- **Entitlement from success events only** — no grants before paid
- **Metadata correlates** — webhooks must map to your records
- **Secrets server-side, idempotent consumers** — reliability + security

---

## Quick-Start Checklist

- [ ] Checkout/session created server-side; metadata passed
- [ ] Amounts from server logic; no client-supplied totals
- [ ] Subscription plans defined for recurring products
- [ ] Webhook signatures verified; events deduped
- [ ] Entitlements granted on success/active; revoked on cancel/refund
- [ ] Reconcile via API when state diverges
- [ ] Secrets server-side; sandbox vs production separated
- [ ] Webhook failures, declines, churn monitored
