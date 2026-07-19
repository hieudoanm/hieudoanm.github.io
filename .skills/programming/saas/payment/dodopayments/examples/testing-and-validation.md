# Dodo Payments Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Dodo Payments Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Checkout/session created server-side; metadata passed
- [ ] Amounts from server logic; no client-supplied totals
- [ ] Subscription plans defined for recurring products
- [ ] Webhook signatures verified; events deduped
- [ ] Entitlements granted on success/active; revoked on cancel/refund
- [ ] Reconcile via API when state diverges
- [ ] Secrets server-side; sandbox vs production separated

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
