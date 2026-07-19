# Polar Best Practices: Workflow Checklist

A practical run sheet for applying [Polar Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Products** (one-time purchases) and **subscriptions** (recurring) with **benefits**
- [ ] 1. Core Stack & Concepts: **Benefits** are the deliverables you control: license keys, private repo access, community roles
- [ ] 2. Checkout & Product Model: Define **products + tiers** (Free/Pro/Team as subscriptions or one-time) with per-tier **benefits**
- [ ] 2. Checkout & Product Model: Pass **custom metadata** (user id, org) on orders/subs for reconciliation
- [ ] 3. Webhooks & Entitlement: **Verify webhook signatures** (HMAC on raw body) before trusting payloads
- [ ] 3. Webhooks & Entitlement: **Dedup by event id** — retries deliver duplicates
- [ ] 4. Open-Source & Community: Map **repo → product/benefit** so funding traces to deliverables (e.g., private Discord, sponsor role)
- [ ] 4. Open-Source & Community: **Pledges/donations** are part of the model — support "sponsor me" without an Apple-tax equivalent
- [ ] 5. Reliability & Operations: **Retry/backoff webhook consumer**; idempotent handlers (dedup by event id)
- [ ] 5. Reliability & Operations: Persist **order/subscription ids** in your DB as ground truth for support/refund handling

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
