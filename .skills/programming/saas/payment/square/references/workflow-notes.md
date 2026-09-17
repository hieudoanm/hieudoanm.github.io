# Workflow notes

Focused reference for **square**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Integration & Checkout

- **Idempotency keys required** on all CreatePayment calls — generate per attempt
- **Use Web Payments SDK** to obtain a `card_nonce` or use **Payment Links** — avoid raw PAN handling
- **Amounts server-side** — never trust the client's total
- **Pin the API version header** (`Square-Version`) — behavior can change across versions
- **Handle `COMPLETED` vs `PENDING`/`FAILED`** states on `payment.updated`

---

## 3. Webhooks & State

- **Verify webhook signatures** (HMAC with your app's webhook signature key) on raw body
- **Dedup events by `event_id`** before acting
- Grant entitlements on **`payment.updated → status COMPLETED`** (idempotently)
- Handle **cancellations/refunds** and `invoice.updated` flows
- **Reconcile with GET Payment** when webhook lag threatens correctness
