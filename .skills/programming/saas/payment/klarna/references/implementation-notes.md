# Implementation notes

Focused reference for **klarna**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Webhooks & Notifications

- Register **Webhooks** (payment/checkout) and verify integrity with the provided **pre-shared auth / signature**
- Events: `payment.updated` (authorized, captured, partially captured), `checkout.order_completed`, session expired
- **Dedup/process idempotently** — webhooks may be redelivered
- **Reconcile with `GET Order`** when webhook vs local state diverges

---

## 5. Security & Operations

- **Credentials server-side** (username/password for API, not in browser)
- Separate **Playground and Production** credentials; never share across envs
- **No sensitive data in logs** (session/order ids ok; amounts/emails minimal)
- Monitor:
  - **authorization → capture mismatch** (biggest money risk)
  - **capture failures / expiries**
  - **checkout abandonment**
- Region/availability: Klarna is **not available in every country** — feature-flag accordingly
