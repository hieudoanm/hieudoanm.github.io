# Review checklist

Focused reference for **stripe**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Webhooks are truth; API calls are commands** — design around events
- **Idempotency everywhere** — keys on calls, dedup on webhook processing
- **Money math stays server-side** — amounts, tax, discounts never trusted from the client
- **Secrets stay secret** — scoped keys, verified signatures, no logging

---

## Quick-Start Checklist

- [ ] `sk_` keys server-side only; publishable key minimal-scoped
- [ ] Checkout Session / Payment Element used; amounts computed server-side
- [ ] Idempotency keys on all mutating calls
- [ ] Webhook signatures verified; event IDs deduped
- [ ] Canonical events handled (intents, invoices, subscriptions, disputes, refunds)
- [ ] Payment state persisted from webhooks (not client callbacks)
- [ ] Failed payments + disputes monitored; retries with backoff
- [ ] Live/test isolated; no card/secret logging
