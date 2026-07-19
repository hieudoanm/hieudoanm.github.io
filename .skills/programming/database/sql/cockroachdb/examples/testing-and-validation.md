# CockroachDB Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for CockroachDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] UUID/distributed keys; no monotonic sequence PKs
- [ ] Serializable isolation embraced; timeout/retry handling in application code
- [ ] Transactions retry-safe (idempotent closure); chattiness minimized
- [ ] Regional placement explicit; cross-region write amplification minimized
- [ ] Indexes designed for distributed execution; FK use deliberate in hot paths
- [ ] Long-running transactions avoided; contention/retry metrics monitored
- [ ] Schema changes planned as online-but-costly operations

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
