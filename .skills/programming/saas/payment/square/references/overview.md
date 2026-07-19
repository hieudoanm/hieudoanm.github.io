# Overview

Focused reference for **square**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
