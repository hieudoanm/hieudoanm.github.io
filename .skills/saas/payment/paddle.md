---
name: paddle
description: Best practices for selling digital products and subscriptions with Paddle. Use when integrating checkout, handling merchant-of-record tax/refunds, or consuming webhooks — covers webhook signatures, product/subscription modeling, and revenue recognition.
---

# Paddle Best Practices

Paddle is a **merchant of record** (MoR): it handles sales tax, VAT, invoicing, and refunds for digital goods. Best practice is leaning on that model — Paddle owns tax/fiscal obligations, you consume **webhooks** for payment/fulfillment, and you keep product/catalog and prices server-side while honoring Paddle's pricing model (License pricing / Catalogs).

---

## 1. Core Stack & Concepts

- **Checkout** for one-time; **subscriptions** (Paddle continually evolves the API — PaddleJS/API, Fortnightly, etc.)
- **Merchant of record**: Paddle issues invoices, collects/pays tax, handles refunds
- **Webhooks**: subscription created/updated/paused/canceled, transaction completed, payment failed, refunds, one-off payments
- **Products/Catalog** with price definitions (`amount`, currency, billing cycle)

```js
// Classic webhook signature verification
const signature = req.headers["Paddle-Signature"];
// verify HMAC with your Webhook Secret + raw body, then handle event
```

---

## 2. Checkout & Subscription Modeling

- **Create products/prices in the Catalog**; subscribe users via Checkout/overlay
- **Pass `passthrough` meta** (user/order id) for reconciliation
- **Map Paddle subscription lifecycle → your entitlements**: active/paused/past_due/canceled
- Use **custom prices / pay-what-you-want** only where product strategy demands it
- **Never trust client-side totals** — tax/invoice generation belongs to Paddle; amounts are server-side

---

## 3. Webhooks & Fulfillment

- **Verify webhook signatures** (HMAC on raw body) before trusting the payload
- **Dedup events by `id`/`subscription_id + event_type`**
- Grant access **only on confirmed/paid states** (`transaction.completed`, subscription active)
- On **payment failure / subscription paused**: downgrade or surface billing issues, don't silently revoke instantly where product policy allows grace
- Handle **refunds and chargebacks** — revoke entitlement when paid-backed

```ts
switch (event.event_type) {
  case "transaction.completed":
    await grantLicense(event.data.passthrough, event.data.payout);
    break;
  case "subscription.canceled":
    await revokeAtRenewal(event.data.subscription_id);
    break;
}
```

---

## 4. Data, Revenue & Operations

- Use **passthrough / `invoice_number` / transaction IDs** for external reconciliation
- **Keep receipts in your DB** (transaction + subscription IDs) as ground truth for support
- **MoR means tax is Paddle's responsibility** — don't hand-roll tax logic
- **Live vs sandbox** strictly separated; secrets (webhook secret) server-side
- Monitor:
  - **webhook failures / delivery lag**
  - **payment failures and failed checkouts**
  - **refund / chargeback rates**

---

## 5. General Rules of Thumb

- **Let Paddle be the merchant of record** — tax, invoices, refunds are theirs
- **Webhooks drive entitlements** — fulfillment reacts to paid/active state
- **Meta/passthrough ties it together** — reconcile against your users
- **Secrets verified and server-side** — never trust unverified webhooks

---

## Quick-Start Checklist

- [ ] Catalog products/prices defined; checkout integrated for one-time + subscription
- [ ] passthrough/target carries user/order references for reconciliation
- [ ] Webhook signatures verified; events deduped by id
- [ ] Access granted only on paid/active states; grace handled for failures
- [ ] Refunds/chargebacks revoke entitlement
- [ ] Transaction/subscription IDs persisted as ground truth
- [ ] Sandbox vs live separated; webhook secrets server-side
- [ ] Webhook/lag, payment failures, refund rates monitored