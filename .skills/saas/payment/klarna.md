---
name: klarna
description: Best practices for integrating Klarna payment and Pay Later services. Use when offering Klarna checkout, affecting order flows with a payment SDK/v2 API, or handling webhooks — covers session creation, authorization, and capture (order management).
---

# Klarna Best Practices

Klarna offers **Checkout (v2), Payment (v3), and Pay Later** products. Best practice is session-first integration: create a **Checkout Session** server-side, the client renders the iframe, your server **captures/holds the order** after authorization, and **webhooks** tell you the final state.

---

## 1. Core Stack & Concepts

- **Checkout v3**: `POST /payments/v1/sessions` → render iframe → `authorization_token`
- **Order Management**: `POST /ordermanagement/v1/orders/{order_id}/authorize`, then **capture**
- **Holds vs captures** — authorize reserves funds; capture settles; mismatch = missed money
- **Webhooks** for checkout/payment events (requires EU region typically)
- Environment: **Playground vs Production**; auth is basic (username:password)

```
Server ──create session──► Klarna ──render iframe──► Client approves
Client ──(order_id)──► Server ──capture──► Klarna
                              └─ webhooks ─► final state / notifications
```

---

## 2. Integration & Checkout

- **Create the session server-side** with `purchase_country`, `purchase_currency`, locale, and line items
- Pass **order amounts/items from your cart logic**, never client-supplied totals
- Use session flow with **iframe/redirect** (don't build raw funding").locale
- Capture the returned `order_id`; keep it for order-management calls
- **Testing**: set `merchant_reference1` (order id) and test amounts; use Playground tokens

---

## 3. Authorization & Capture

- After client approval, **authorize** then **capture** (full or partial)
- **Capture once** — double-capture is a chargeback/lost-money path
- Handle **authorization expiries** (Klarna authorizations expire; re-auth needed) explicitly
- Use **holding/auto-capture** only when appropriate for your business model
- **Refund** via order management when requested

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

---

## 6. General Rules of Thumb

- **Session-first: create on server, render on client, capture on server**
- **Capture is where money lands** — authorize-then-capture, never double
- **Webhooks reconcile state** — trust them + re-check with GET Order
- **Server-side amounts and credentials** — the payment trust boundary

---

## Quick-Start Checklist

- [ ] Checkout session created server-side with correct country/currency/locale
- [ ] Amounts/line items from server logic only
- [ ] Authorization → capture flow; single capture; expiry handling
- [ ] Refunds via order management
- [ ] Webhooks registered + verified; events deduped/processed
- [ ] Reconcile with GET Order on divergence
- [ ] Playground vs Production separated; credentials server-side
- [ ] Auth→capture mismatches, abandonments, capture failures monitored