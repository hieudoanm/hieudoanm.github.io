# Paddle Best Practices: Workflow Checklist

A practical run sheet for applying [Paddle Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Checkout** for one-time; **subscriptions** (Paddle continually evolves the API — PaddleJS/API, Fortnightly, etc.)
- [ ] 1. Core Stack & Concepts: **Merchant of record**: Paddle issues invoices, collects/pays tax, handles refunds
- [ ] 2. Checkout & Subscription Modeling: **Create products/prices in the Catalog**; subscribe users via Checkout/overlay
- [ ] 2. Checkout & Subscription Modeling: **Pass passthrough meta** (user/order id) for reconciliation
- [ ] 3. Webhooks & Fulfillment: **Verify webhook signatures** (HMAC on raw body) before trusting the payload
- [ ] 3. Webhooks & Fulfillment: **Dedup events by id/subscription_id + event_type**
- [ ] 4. Data, Revenue & Operations: Use **passthrough / invoice_number / transaction IDs** for external reconciliation
- [ ] 4. Data, Revenue & Operations: **Keep receipts in your DB** (transaction + subscription IDs) as ground truth for support
- [ ] 5. General Rules of Thumb: **Let Paddle be the merchant of record** — tax, invoices, refunds are theirs
- [ ] 5. General Rules of Thumb: **Webhooks drive entitlements** — fulfillment reacts to paid/active state

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
