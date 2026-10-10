# Overview

Focused reference for **paypal**, excerpted from SKILL.md. The skill file remains the canonical guide.

# PayPal Best Practices

PayPal offers checkout and merchant APIs (REST v2 Orders/Catalog/Subscriptions) plus the classic flow. Best practice is using the **Orders v2 API** for modern checkout, **verifying webhooks** for order/billing state, and reconciling against the order ID rather than trusting client callbacks.

---

## 1. Core Stack & Concepts

- **Orders v2 API** (`/v2/checkout/orders`) — create → capture (two-phase)
- **Subscriptions/Billing Plans** (via Catalog Products + Plans) for recurring
- **Identity** endpoints for user consent (OpenID) if needed
- **Webhooks** for `PAYMENT.CAPTURE.COMPLETED` etc.
- **Access token**: OAuth2 `client_credentials` — token is short-lived, cache it

```http
POST /v2/checkout/orders
Authorization: Bearer <access_token>
{ "intent": "CAPTURE", "purchase_units": [{ "amount": { "currency_code":"USD", "value":"20.00" } }] }
```
