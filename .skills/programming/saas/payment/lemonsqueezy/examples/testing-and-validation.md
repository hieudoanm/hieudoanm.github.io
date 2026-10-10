# Lemon Squeezy Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Lemon Squeezy Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Products/variants defined; checkout + `custom` correlation in place
- [ ] Webhook signatures verified (HMAC on raw body); events deduped
- [ ] Entitlement granted on paid/active; revoked on cancel/expiry/refund
- [ ] License keys validated server-side where online
- [ ] Order/subscription IDs persisted for reconciliation
- [ ] Sandbox vs production separated; webhook secret server-side
- [ ] Webhook failures, churn, refund rates monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
