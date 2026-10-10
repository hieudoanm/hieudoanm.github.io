# Polar Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Polar Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Products/tiers + benefits defined; checkout integrated
- [ ] Metadata (user/org) passed for reconciliation
- [ ] Webhook signatures verified; events deduped
- [ ] Benefits granted on active/paid; revoked on revoke/cancel/expire
- [ ] License keys generated + validated server-side where online
- [ ] Order/subscription ids persisted; sandbox/prod separated
- [ ] Webhook failures, churn, grant failures monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
