# Overview

Focused reference for **dodopayments**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
