# SQLite Best Practices: 4. Reliability & Performance

## Scenario

A project is working on **4. reliability & performance** for SQLite Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Index frequently queried columns**; avoid full table scans in hot paths
- Validate queries with **`EXPLAIN QUERY PLAN`** (SQLite has no `EXPLAIN ANALYZE`)
- **Batch writes in transactions** — per-row autocommit is the main perf killer
- Avoid unbounded result sets; test with realistic data sizes
- Be explicit about `synchronous` settings and durability trade-offs

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Performance** section of [SKILL.md](../SKILL.md).
