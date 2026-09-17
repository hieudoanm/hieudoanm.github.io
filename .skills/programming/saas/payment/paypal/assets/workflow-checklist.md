# PayPal Best Practices: Workflow Checklist

A practical run sheet for applying [PayPal Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Orders v2 API** (/v2/checkout/orders) — create → capture (two-phase)
- [ ] 1. Core Stack & Concepts: **Subscriptions/Billing Plans** (via Catalog Products + Plans) for recurring
- [ ] 2. Checkout Integration: **Create the order server-side** with amounts/currency; never take totals from the client
- [ ] 2. Checkout Integration: **Capture after approval** (or immediate capture for one-phase); handle COMPLETED vs APPROVED
- [ ] 3. Subscriptions & Billing: **Create Product + Plan (billing cycle) + Subscription** via Catalog/Billing APIs
- [ ] 3. Subscriptions & Billing: Webhooks: BILLING.SUBSCRIPTION.ACTIVATED, .CANCELLED, .SUSPENDED, .EXPIRED
- [ ] 4. Webhooks & Verification: **Verify webhook signatures**: get the verification cert via /v1/notifications/verify-webhook-signature with raw body + request headers
- [ ] 4. Webhooks & Verification: **Dedup events** by event_id before applying
- [ ] 5. Security & Operations: **Access token cached** (don't fetch per request); scoped to your app credentials
- [ ] 5. Security & Operations: **Client ID/secret server-side only**; never in frontend bundles

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
