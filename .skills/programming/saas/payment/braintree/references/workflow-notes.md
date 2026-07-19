# Workflow notes

Focused reference for **braintree**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
