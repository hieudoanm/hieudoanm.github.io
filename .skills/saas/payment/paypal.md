---
name: paypal
description: Best practices for integrating PayPal payments. Use when adding checkout, subscriptions/billing, or handling webhooks — covers order/v2 API, webhook verification, and dispute handling.
---

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

---

## 2. Checkout Integration

- **Create the order server-side** with amounts/currency; never take totals from the client
- **Capture after approval** (or immediate capture for one-phase); handle `COMPLETED` vs `APPROVED`
- **Two-phase**: `create` → client approves → you `capture`. Retry-capture on surprises
- Use **client token / JS SDK** for approval; session keeps `orderId` server-side
- **Never double-capture**: mark an order captured in your DB and idempotent-guard payments

---

## 3. Subscriptions & Billing

- **Create Product + Plan (billing cycle) + Subscription** via Catalog/Billing APIs
- Webhooks: `BILLING.SUBSCRIPTION.ACTIVATED`, `.CANCELLED`, `.SUSPENDED`, `.EXPIRED`
- Map subscription lifecycle → entitlements (grace on failure, revoke on cancel)
- Reconcile plan/currency changes as API-level updates, not DB hacks

---

## 4. Webhooks & Verification

- **Verify webhook signatures**: get the verification cert via `/v1/notifications/verify-webhook-signature` with raw body + request headers
- **Dedup events** by `event_id` before applying
- On `PAYMENT.CAPTURE.COMPLETED`, **grant access idempotently** (store capture id)
- Handle **`PAYMENT.CAPTURE.DENIED`**, refunds, and **disputes (chargebacks)** — revoke entitlement on confirmed cases
- Poll/`GET` the order to **reconcile discrepancies**; webhooks can lag

---

## 5. Security & Operations

- **Access token cached** (don't fetch per request); scoped to your app credentials
- **Client ID/secret server-side only**; never in frontend bundles
- **OAuth2 and IPN are legacy** — prefer v2 API + REST webhooks for new integrations
- Monitor:
  - **webhook failures / delivery lag**
  - **capture/denial rates**
  - **dispute/chargeback counts**

---

## 6. General Rules of Thumb

- **Orders v2 + webhooks** — modern API, not classic buttons/IPN
- **Capture is the money event** — grant access on capture completion, idempotently
- **Verify everything** — webhook signatures and order status via API
- **Server-side money math** — amounts never client-supplied

---

## Quick-Start Checklist

- [ ] Orders v2 (create → capture) integrated; two-phase handled
- [ ] Amounts computed server-side; order id reconciled in DB
- [ ] Webhook signatures verified; events deduped by event_id
- [ ] Capture completion grants access idempotently (capture id stored)
- [ ] Subscriptions mapped to entitlements (active/canceled/expired)
- [ ] Refunds/disputes revoke entitlement on confirmations
- [ ] Access tokens cached; credentials server-side only
- [ ] Webhook/lag, denial rates, dispute counts monitored