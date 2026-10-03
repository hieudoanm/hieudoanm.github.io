---
name: dodopayments
description: Best practices for integrating Dodo Payments, a payments platform for digital products. Use when accepting payments/subscriptions, handling local payment methods, or consuming webhooks — covers robust online payments, signature verification, and entitlement flow.
---

# Dodo Payments Best Practices

Dodo Payments is a payments platform (payments + subscriptions, checkout links/SDK). Best practice is the standard payment-service contract: **server-side session/checkout**, **webhook signatures verified**, **idempotent entitlement grants**, and **no client-trusted amounts**.

---

## 1. Core Stack & Concepts

- **Payments API / checkout** for one-time; **subscriptions** for recurring digital goods
- **Checkout link / SDK** so card & local methods don't touch your server
- **Webhooks** for `payment.succeeded` / `subscription.*` lifecycle
- **Local payment methods** supported (relevant to emerging markets)
- Credentials: API key (secret, server-side), webhook secret

---

## 2. Integration & Checkout

- **Create checkout/session server-side** with amount + currency + metadata
- Pass **reference metadata** (user/order id) so webhooks reconcile to your records
- **Amounts always from server logic**, never client-supplied totals
- Use **subscription plans** defined on Dodo for recurring products
- Choose **SDK vs hosted checkout** consistently per flow (both safe), but never raw PAN handling

---

## 3. Webhooks & Entitlement

- **Verify webhook signature** (HMAC with webhook secret over raw body) before acting
- **Dedup events by event id** — consumers must be idempotent
- **Grant entitlements only on success/active events** (`payment.succeeded`, subscription active)
- **Revoke on subscription cancel/expire** and refund events
- When uncertain, **fetch the payment/subscription status via API** to reconcile

```ts
const mac = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (mac !== signature) return res.status(401).end();
// dedup → handle event → grant/revoke entitlement
```

---

## 4. Data & Security

- **API/webhook secrets server-side only**; never in the client
- Store **payment/subscription ids + metadata** for reconciliation and support
- **No raw payment data in logs**; keep amounts/ids minimal
- **Sandbox (test) vs production** separated; use test keys for integration work

---

## 5. Reliability & Operations

- **Retry with backoff** on rate limits and transient errors; idempotent calls
- **Queue webhook processing** — a failure shouldn't lose entitlement events
- Monitor:
  - **webhook delivery failures / lag**
  - **payment failures and declines**
  - **subscription churn / failed renewals**
- **Region/availability awareness** — local methods vary by market; feature-flag accordingly

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