# Braintree Best Practices: Workflow Checklist

A practical run sheet for applying [Braintree Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Client Token** — generated server-side; lets the client safely drop sensitive payment data
- [ ] 1. Core Stack & Concepts: **Drop-in UI / Custom UI** on the client; **your server never sees PANs**
- [ ] 2. Integration & Transactions: **Create nonces client-side; sale server-side** — transaction requests go to your backend
- [ ] 2. Integration & Transactions: Use **idempotency** via unique orderId/paymentMethodNonce reuse policies (nonces are single/multi-use by config)
- [ ] 3. Subscriptions & Recurring: Model **plans → subscriptions** via the API; parameters (trial, billing cycle) configured per plan
- [ ] 3. Subscriptions & Recurring: Webhooks: subscription_charged_successfully, subscription_charged_unsuccessfully, subscription_canceled, subscription_churned
- [ ] 4. Webhooks & Verification: **Verify webhook payloads** with your Braintree public key (HMAC signature) — never trust raw POSTs
- [ ] 4. Webhooks & Verification: **Dedup events** by webhook id before applying (delivery can repeat)
- [ ] 5. Security & Operations: **Credentials server-side**: merchant ID + keys (public/private) never in the client
- [ ] 5. Security & Operations: **Validate nonces are from your merchant account**; protect the Drop-in token surface

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
