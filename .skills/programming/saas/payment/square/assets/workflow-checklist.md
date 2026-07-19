# Square Best Practices: Workflow Checklist

A practical run sheet for applying [Square Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Access Tokens** are seller-scoped (per seller/location) — manage per-merchant, not one global key
- [ ] 1. Core Stack & Concepts: **Payments API**: CreatePayment, CreateCheckout, CreatePaymentLink
- [ ] 2. Integration & Checkout: **Idempotency keys required** on all CreatePayment calls — generate per attempt
- [ ] 2. Integration & Checkout: **Use Web Payments SDK** to obtain a card_nonce or use **Payment Links** — avoid raw PAN handling
- [ ] 3. Webhooks & State: **Verify webhook signatures** (HMAC with your app's webhook signature key) on raw body
- [ ] 3. Webhooks & State: **Dedup events by event_id** before acting
- [ ] 4. Data & Security: **Per-seller tokens** — separate access tokens per merchant/location, rotated
- [ ] 4. Data & Security: **Never log card data or tokens**; store only payment/order IDs
- [ ] 5. Reliability & Operations: **Retry with backoff** on rate limits (429) and transient errors, using fresh idempotency keys
- [ ] 5. Reliability & Operations: Monitor:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
