# RevenueCat Best Practices: Workflow Checklist

A practical run sheet for applying [RevenueCat Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Entitlements ↔ Products ↔ Offerings**: offerings = your curated product groupings; entitlements = what the user "owns"
- [ ] 1. Core Stack & Concepts: **SDKs** for iOS/Android (and web via RevenueCat Web + Stripe)
- [ ] 2. Integration & SDK Use: **Configure offerings/products in the dashboard**, referenced by ID in code
- [ ] 2. Integration & SDK Use: Handle **purchase success → check entitlement** on the client, but **persist server-side via webhook**
- [ ] 3. Entitlements & Backend Truth: **Verify entitlement status server-side** through SDk/webhook or GET /subscribers/{app_user_id} — don't trust client-side flags for security-sensitive features
- [ ] 3. Entitlements & Backend Truth: **Cache entitlement lookups with timeout** — don't hit RC on every request
- [ ] 4. Trials, Promotions & Store Compliance: Use **offerings + intro offers** via the SDK/paywall to drive trials; monitor **trial->paid conversion**
- [ ] 4. Trials, Promotions & Store Compliance: **NEW app store rules**: external purchase links (EU store policies) — keep RC and any external flow aligned on entitlement state
- [ ] 5. Reliability & Operations: **Verify webhook auth** (Authorization: Bearer RC Webhook Secret) before processing
- [ ] 5. Reliability & Operations: **Idempotent webhook handling** — dedup by event id; retries expected

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
