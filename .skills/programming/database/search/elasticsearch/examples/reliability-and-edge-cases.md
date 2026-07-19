# Elasticsearch Best Practices: 4. Performance & Reliability

## Scenario

A project is working on **4. performance & reliability** for Elasticsearch Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Design queries to limit scanned documents**
- **Avoid deep pagination with `from + size`** — prefer **`search_after`** (or PIT) for deep paging
- **Limit aggregation cardinality** (`terms` on high-cardinality fields is memory-heavy)
- **Tune shard count for index size — avoid over-sharding**
- Monitor **heap usage and circuit breakers**; watch slow queries

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance & Reliability** section of [SKILL.md](../SKILL.md).
