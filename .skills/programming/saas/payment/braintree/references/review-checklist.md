# Review checklist

Focused reference for **braintree**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Client token + Drop-in** means PCI surface stays minimal
- **Server-side sales, webhook-driven truth** — the async contract
- **Vault + subscriptions** are the recurring-lifecycle toolkit
- **Verify, dedup, idempotent-grant** — the webhook reliability triad

---

## Quick-Start Checklist

- [ ] Client token generated server-side; Drop-in/custom UI used (no PAN handling)
- [ ] `transaction.sale` server-side with deliberate nonce/idempotency
- [ ] Amounts/currency from server logic only
- [ ] Subscriptions modeled with plans; state fed by webhooks
- [ ] Webhook signatures verified; events deduped
- [ ] Entitlement on settled/successful charge (idempotent); disputes revoke
- [ ] Credentials server-side; no card-data logging
- [ ] Declines, webhook failures, chargebacks monitored
