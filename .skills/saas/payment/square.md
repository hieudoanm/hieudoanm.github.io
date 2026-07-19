---
name: square
description: Best practices for integrating Square payments, including cards, subscriptions, and invoicing. Use when building checkout, commerce APIs, or processing online sales — covers API access tokens, webhooks, and secure payment handling.
---

# Square Best Practices

Square provides commerce APIs (Payments, Subscriptions, Invoicing, Catalog). Best practice is using **access tokens scoped to a seller**, the **Payments API** with idempotency, hosted/fast checkout to avoid raw card handling, and **webhooks** as the source of payment truth.

---

## 1. Core Stack & Concepts

- **Access Tokens** are seller-scoped (per seller/location) — manage per-merchant, not one global key
- **Payments API**: `CreatePayment`, `CreateCheckout`, `CreatePaymentLink`
- **Cards**: use **Square Web Payments SDK / Fast Checkout** (card details don't touch your server)
- **Subscriptions** via `subscriptionsApi`; **Invoices** via `invoicesApi`
- **Webhooks** (v1→v2) for `payment.created`, `payment.updated`, `invoice.scheduled`, `subscription.*`

```bash
curl -X POST https://connect.squareup.com/v2/payments \
  -H "Authorization: Bearer $SQUARE_ACCESS_TOKEN" \
  -H "Square-Version: 2024-01-18" \
  -d '{
    "idempotency_key": "order_123",
    "source_id": "cnon:card_nonce_ok",
    "amount_money": {"amount": 2000, "currency": "USD"}
  }'
```

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

---

## 4. Data & Security

- **Per-seller tokens** — separate access tokens per merchant/location, rotated
- **Never log card data or tokens**; store only payment/order IDs
- **Location awareness**: payments are against a location — choose the right one
- **Secrets and tokens server-side only**; never in the client bundle

---

## 5. Reliability & Operations

- **Retry with backoff** on rate limits (429) and transient errors, using fresh idempotency keys
- Monitor:
  - **webhook delivery failures**
  - **payment failures / declines**
  - **subscription cancellations and retry failures**
- Plan for **Square outages** — queue + retry over blocking the request path

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