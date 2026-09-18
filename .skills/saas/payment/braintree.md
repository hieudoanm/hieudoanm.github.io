---
name: braintree
description: Best practices for payment integration with Braintree (PayPal's gateway). Use when accepting cards, PayPal, and alternative methods, or adding subscriptions — covers client tokens, server-side transactions, and webhooks.
---

# Braintree Best Practices

Braintree is a payments gateway with a strong async-first API and owned by PayPal. Best practice is keeping the **card/sensitive data out of your server** (client token + Drop-in UI), running transaction requests server-side with idempotency, and consuming **webhooks** for state changes.

---

## 1. Core Stack & Concepts

- **Client Token** — generated server-side; lets the client safely drop sensitive payment data
- **Drop-in UI / Custom UI** on the client; **your server never sees PANs**
- **Sales**: `transaction.sale` with `payment_method_nonce` or a saved payment method
- **Subscriptions** via `subscription.create`; **Vault** for saved payment methods
- **Webhooks** for transactions/subscriptions/disputes

```ts
// server generates a token for the client; client never handles card numbers directly
const gateway = braintree.connect({ environment, merchantId, publicKey, privateKey });
const { clientToken } = await gateway.clientToken.generate({});
```

---

## 2. Integration & Transactions

- **Create nonces client-side; sale server-side** — transaction requests go to your backend
- Use **idempotency** via unique `orderId`/`paymentMethodNonce` reuse policies (nonces are single/multi-use by config)
- **Amounts and currency server-side** — accept totals from your own logic, not the client
- Support **multiple payment methods** (cards, PayPal, Vault) behind one checkout
- Use **vaulting intentionally** for repeat customers (consent + storage handling)

---

## 3. Subscriptions & Recurring

- Model **plans → subscriptions** via the API; parameters (trial, billing cycle) configured per plan
- Webhooks: `subscription_charged_successfully`, `subscription_charged_unsuccessfully`, `subscription_canceled`, `subscription_churned`
- **Entitlement from successful charges only**; grace on failed retries where policy allows
- Reconcile subscription state locally from webhooks (not client calls)

---

## 4. Webhooks & Verification

- **Verify webhook payloads** with your Braintree public key (HMAC signature) — never trust raw POSTs
- **Dedup events** by webhook id before applying (delivery can repeat)
- On `transaction_settled`/`subscription_charged_successfully`: grant access idempotently
- Handle **disputes/chargebacks** — revoke entitlement on confirmed cases
- **Ack quickly** and fail-queue webhook processing so Braintree doesn't keep retrying

---

## 5. Security & Operations

- **Credentials server-side**: merchant ID + keys (public/private) never in the client
- **Validate nonces are from your merchant account**; protect the Drop-in token surface
- **No PAN/CCV logging**, even masked copy-paste; store `transaction.id` as ground truth
- Monitor:
  - **webhook failures**
  - **decline rates and gateway errors**
  - **chargeback / dispute rates**
- **Graceful gateway outage handling** — never block a user request on the gateway sync

---

## 6. General Rules of Thumb

- **Client token + Drop-in** means PCI surface stays minimal
- **Server-side sales, webhook-driven truth** — the async contract
- **Vault + subscriptions** are the recurring-lifecycle toolkit
- **Verify, dedup, idempotent-grant** — the webhook reliability triad

---

## Quick-Start Checklist

- [ ] Client token generated server-side; Drop-in/custom UI used (no PAN handling)
- [ ] `transaction.sale` server-side with deliberate nonce/idempotency
- [ ] Amounts/currency from server logic only
- [ ] Subscriptions modeled with plans; state fed by webhooks
- [ ] Webhook signatures verified; events deduped
- [ ] Entitlement on settled/successful charge (idempotent); disputes revoke
- [ ] Credentials server-side; no card-data logging
- [ ] Declines, webhook failures, chargebacks monitored