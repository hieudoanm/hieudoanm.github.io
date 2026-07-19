# Apache Kafka Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Apache Kafka Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Topics aligned to business events; stable naming; no cross-domain sharing
- [ ] Immutable, append-only events; schemas versioned (registry), non-breaking
- [ ] Partition keys chosen intentionally; no premature over-partitioning
- [ ] `acks`/idempotence correct for producers; explicit delivery semantics
- [ ] Offsets committed after processing; consumers idempotent
- [ ] Retention/cleanup policies explicit; compaction only where semantics need it
- [ ] Consumer lag monitored; hot partitions avoided; batching tuned

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
