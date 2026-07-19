# OpenSearch Best Practices: 4. Performance & Reliability

## Scenario

A project is working on **4. performance & reliability** for OpenSearch Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Avoid deep pagination with `from + size`** — prefer **`search_after`/scroll** for large result sets
- **Limit aggregation cardinality**
- **Avoid over-sharding**; tune shard size for data volume
- **Monitor JVM heap, GC, and circuit breakers**
- Test queries with **realistic data sizes**; explain query cost and cluster impact
- Use **ISM** to manage index lifecycle (rollover, deletion, snapshots)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance & Reliability** section of [SKILL.md](../SKILL.md).
