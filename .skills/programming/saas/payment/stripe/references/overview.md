# Overview

Focused reference for **stripe**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
