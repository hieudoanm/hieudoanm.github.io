# PayPal Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for PayPal Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Orders v2 (create → capture) integrated; two-phase handled
- [ ] Amounts computed server-side; order id reconciled in DB
- [ ] Webhook signatures verified; events deduped by event_id
- [ ] Capture completion grants access idempotently (capture id stored)
- [ ] Subscriptions mapped to entitlements (active/canceled/expired)
- [ ] Refunds/disputes revoke entitlement on confirmations
- [ ] Access tokens cached; credentials server-side only

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
