# Braintree Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Braintree Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Client token generated server-side; Drop-in/custom UI used (no PAN handling)
- [ ] `transaction.sale` server-side with deliberate nonce/idempotency
- [ ] Amounts/currency from server logic only
- [ ] Subscriptions modeled with plans; state fed by webhooks
- [ ] Webhook signatures verified; events deduped
- [ ] Entitlement on settled/successful charge (idempotent); disputes revoke
- [ ] Credentials server-side; no card-data logging

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
