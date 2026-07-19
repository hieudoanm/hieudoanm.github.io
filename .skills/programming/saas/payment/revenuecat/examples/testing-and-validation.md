# RevenueCat Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for RevenueCat Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Offerings/products configured; SDK integrated on each platform
- [ ] Purchase → entitlement flow tested in sandbox; RC keys per env
- [ ] Webhooks verified + deduped; entitlement events processed backend
- [ ] Server-side entitlement checks (SDK verify / API) not client-only flags
- [ ] Revoke on entitlement revoked/expired; refunds handled
- [ ] Offers/trials monitored for conversion; transfer/proration handled
- [ ] Periodic reconciliation vs subscribers endpoint

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
