# Klarna Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Klarna Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Checkout session created server-side with correct country/currency/locale
- [ ] Amounts/line items from server logic only
- [ ] Authorization → capture flow; single capture; expiry handling
- [ ] Refunds via order management
- [ ] Webhooks registered + verified; events deduped/processed
- [ ] Reconcile with GET Order on divergence
- [ ] Playground vs Production separated; credentials server-side

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
