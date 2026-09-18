---
name: stripe
description: Best practices for integrating Stripe payments into a backend. Use when building checkout, subscriptions, webhooks, or payment processing — covers idempotency, webhook signatures, payment-method handling, and monitoring.
---

# Stripe Best Practices

Stripe is the reference payments API. Best practice is treating every call as **idempotent and event-driven**: use idempotency keys, rely on **webhooks as the source of truth** for payment/intent/dispute state, verify signatures, keep secrets server-side, and never trust client-supplied amounts.

---

## 1. Core Stack & Principles

- **API keys**: `pk_` (publishable, client) vs `sk_` (secret, server-only) — never ship `sk_`
- **PaymentIntents** for one-off / dynamic amounts; **Subscriptions** for recurring
- **Checkout Sessions** for hosted flows; **Payment Links/Components** for low-touch embed
- **Webhooks** are how Stripe tells you about state changes — treat them as the source of truth
- **Idempotency** is built into the API via `Idempotency-Key` (or StableParameter in SDKs)

```bash
curl https://api.stripe.com/v1/payment_intents \
  -u sk_test_...: \
  -d amount=2000 -d currency=usd \
  -H "Idempotency-Key: order_123_invoice_456"
```

---

## 2. Integration & Checkout

- Use **Checkout Sessions** or the Payment Element instead of building raw card forms
- **Never compute or modify amounts client-side** — amounts/totals belong server-side
- **Create + confirm intents server-side**; only read `client_secret` on the client
- For subscriptions: configure **payment methods, trials, and prorations** consciously
- Store **`customer` ID** (and payment method IDs) server-side for future charges

---

## 3. Webhooks & State

- **Verify webhook signatures** with your `whsec_` signing secret (HMAC-SHA256) and the `Stripe-Signature` header — never trust unverified payloads
- **Handle event idempotency**: store processed event IDs (crash-safe dedup)
- Handle the **canonical events** explicitly:
  - `payment_intent.succeeded` / `.processing` / `.requires_payment_method` / `.canceled`
  - `invoice.payment_succeeded` / `.payment_failed`
  - `customer.subscription.updated` / `deleted`
  - `charge.dispute.created` / `charge.refunded`
- **Reconcile with `retrieve`** when in doubt; don't guess from partial state

```js
const sigHeader = req.headers["stripe-signature"];
try {
  const event = stripe.webhooks.constructEvent(req.body, sigHeader, process.env.STRIPE_WEBHOOK_SECRET);
  // event.id → dedup → handle by type
} catch (err) { res.status(400).send(`Webhook Error: ${err.message}`); }
```

---

## 4. Data & Endpoints

- Use **metadata** on intents/customers to fan out your own reconciliation
- **Live vs test mode** kept strict (different keys, different secret); never point prod at test
- **Never log full card data or secrets**; store only Stripe IDs + last4 metadata wisely
- **PTA card data**: avoid storing raw PANs — use Stripe Tokens/Payment Elements

---

## 5. Reliability & Monitoring

- **Retry with backoff** on 429 / connection errors; honor rate limits
- **Downstream idempotence**: after `payment_intent.succeeded`, granting access must be idempotent (dedup by event/payment ID)
- Monitor:
  - **webhook failures / delivery lag**
  - **failed payments & disputes**
  - **balance/account negatives**
- Plan for **Stripe outages** — queues and retries over synchronous blocking

---

## 6. General Rules of Thumb

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