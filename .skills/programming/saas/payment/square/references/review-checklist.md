# Review checklist

Focused reference for **square**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Seller-scoped tokens, per-location calls** — the Square reality is multi-tenant by merchant
- **Webhooks are the truth** — react to `payment.updated`, verify signatures
- **Idempotency keys or nothing** — CreatePayment without one is a footgun
- **Don't touch card data** — nonces and Payment Links keep PCI surface near zero

---

## Quick-Start Checklist

- [ ] Per-seller access tokens; client id/secret server-side
- [ ] Web Payments SDK / Payment Links — no raw PAN handling
- [ ] Idempotency key on every CreatePayment; amounts server-side
- [ ] `Square-Version` header pinned
- [ ] Webhooks signature-verified; events deduped by event_id
- [ ] Entitlement granted on COMPLETED (idempotent); refunds/cancellations handled
- [ ] Per-location selection deliberate; tokens rotated
- [ ] Retry/backoff with fresh keys; failures and lag monitored
