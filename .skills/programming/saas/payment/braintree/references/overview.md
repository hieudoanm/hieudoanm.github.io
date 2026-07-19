# Overview

Focused reference for **braintree**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
