# Lemon Squeezy Best Practices: Workflow Checklist

A practical run sheet for applying [Lemon Squeezy Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Products + Variants** define what you sell; **subscriptions** (with trial params) for recurring
- [ ] 1. Core Stack & Concepts: **Checkout** is hosted/overlay; pass **custom data** (custom) for correlation
- [ ] 2. Checkout & Correlation: Create **products/variants** in the dashboard/API; embed checkout link or overlay
- [ ] 2. Checkout & Correlation: Pass **custom fields** (user_id, order context) so webhooks map back to accounts
- [ ] 3. Webhooks & Entitlement: **Verify webhook signatures** (HMAC X-Signature against raw body + webhook secret) before trusting payloads
- [ ] 3. Webhooks & Entitlement: **Dedup by event id** (data.id / event identifier) — delivery can repeat
- [ ] 4. MoR & Compliance: **You do not charge tax** — LS is the seller of record; don't hand-roll VAT/sales tax
- [ ] 4. MoR & Compliance: Keep **transaction/order + subscription ids** in your DB for refunds/disputes
- [ ] 5. Reliability & Operations: **Retry/queue webhook processing** — LS retries failures; your consumer must be idempotent
- [ ] 5. Reliability & Operations: **Sandbox vs production** keys separated; webhook secret server-side only

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
