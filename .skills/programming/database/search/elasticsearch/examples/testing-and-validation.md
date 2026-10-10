# Elasticsearch Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Elasticsearch Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Mappings designed before indexing; index templates in place
- [ ] text vs keyword chosen per field; analyzers language-appropriate
- [ ] No dynamic mapping explosions; no excessive nesting
- [ ] Denormalized model; no join-heavy parent-child patterns
- [ ] Implicit aliases + planned re-indexing; refresh intervals explicit
- [ ] Pagination via `search_after`; no deep `from+size`
- [ ] Aggregation cardinality bounded; shard count tuned (no over-sharding)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
