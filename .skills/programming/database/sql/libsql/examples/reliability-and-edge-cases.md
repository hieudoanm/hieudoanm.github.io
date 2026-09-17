# libSQL Best Practices: 4. Reliability & Performance

## Scenario

A project is working on **4. reliability & performance** for libSQL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Optimize for local reads** — read path should not touch the network
- **Batch writes** to reduce sync overhead
- Index for real query patterns; **avoid large transactions over remote connections**
- Measure latency for **read vs write paths** separately
- **Test offline-first scenarios explicitly**; load-test with replication enabled
- Document **consistency expectations** per feature

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Performance** section of [SKILL.md](../SKILL.md).
