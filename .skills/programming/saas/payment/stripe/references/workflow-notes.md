# Workflow notes

Focused reference for **stripe**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
