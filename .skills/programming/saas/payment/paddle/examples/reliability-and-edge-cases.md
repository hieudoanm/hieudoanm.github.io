# Paddle Best Practices: 4. Data, Revenue & Operations

## Scenario

A project is working on **4. data, revenue & operations** for Paddle Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Use **passthrough / `invoice_number` / transaction IDs** for external reconciliation
- **Keep receipts in your DB** (transaction + subscription IDs) as ground truth for support
- **MoR means tax is Paddle's responsibility** — don't hand-roll tax logic
- **Live vs sandbox** strictly separated; secrets (webhook secret) server-side
- Monitor:
- **webhook failures / delivery lag**
- **payment failures and failed checkouts**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Data, Revenue & Operations** section of [SKILL.md](../SKILL.md).
