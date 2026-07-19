# Overview

Focused reference for **paddle**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
