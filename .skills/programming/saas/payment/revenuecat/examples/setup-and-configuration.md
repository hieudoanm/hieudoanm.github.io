# RevenueCat Best Practices: 3. Entitlements & Backend Truth

## Scenario

A project is working on **3. entitlements & backend truth** for RevenueCat Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Verify entitlement status server-side** through SDk/webhook or `GET /subscribers/{app_user_id}` — don't trust client-side flags for security-sensitive features
- **Cache entitlement lookups with timeout** — don't hit RC on every request
- **Webhooks carry the truth**: subscribe to the canonical events, verify API keys, dedup by event id
- Map **active entitlement → feature access**; revoke when entitlements are revoked/expire
- **Handle subscription transfers and proration** events to keep state consistent

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Entitlements & Backend Truth** section of [SKILL.md](../SKILL.md).
