# MySQL Best Practices: 4. Reliability, Performance & Operations

## Scenario

A project is working on **4. reliability, performance & operations** for MySQL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Use **`EXPLAIN` / `EXPLAIN ANALYZE`** and monitor **slow query log**
- Add and validate indexes deliberately — every index costs writes
- **Avoid long-running transactions** (hold locks, grow undo)
- Tune **connection pools** (honor `max_connections`; pool below it)
- Understand **replication lag** and plan failover/recovery
- Test with **production-like data sizes**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability, Performance & Operations** section of [SKILL.md](../SKILL.md).
