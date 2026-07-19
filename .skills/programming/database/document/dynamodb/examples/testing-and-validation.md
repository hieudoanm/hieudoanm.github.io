# DynamoDB Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for DynamoDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Access patterns enumerated before any table exists
- [ ] Single table; PK/SK encode type + hierarchy; every item has a purpose
- [ ] No production `Scan`; queries via keys/GSIs; pagination designed in
- [ ] Sparse, deliberate GSIs; documents of supported queries kept per table
- [ ] Conditional writes for invariants; consistency chosen per read
- [ ] Hot partitions and unbounded collections avoided; TTL planned
- [ ] Capacity mode selected deliberately; throttling/capacity metrics monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
