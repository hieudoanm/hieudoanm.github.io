# Dodo Payments Best Practices: Workflow Checklist

A practical run sheet for applying [Dodo Payments Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Payments API / checkout** for one-time; **subscriptions** for recurring digital goods
- [ ] 1. Core Stack & Concepts: **Checkout link / SDK** so card & local methods don't touch your server
- [ ] 2. Integration & Checkout: **Create checkout/session server-side** with amount + currency + metadata
- [ ] 2. Integration & Checkout: Pass **reference metadata** (user/order id) so webhooks reconcile to your records
- [ ] 3. Webhooks & Entitlement: **Verify webhook signature** (HMAC with webhook secret over raw body) before acting
- [ ] 3. Webhooks & Entitlement: **Dedup events by event id** — consumers must be idempotent
- [ ] 4. Data & Security: **API/webhook secrets server-side only**; never in the client
- [ ] 4. Data & Security: Store **payment/subscription ids + metadata** for reconciliation and support
- [ ] 5. Reliability & Operations: **Retry with backoff** on rate limits and transient errors; idempotent calls
- [ ] 5. Reliability & Operations: **Queue webhook processing** — a failure shouldn't lose entitlement events

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
