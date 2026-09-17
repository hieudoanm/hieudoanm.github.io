# Neo4J: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Neo4J. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Design the graph schema around your core query patterns.
- [ ] Create indexes and constraints before loading production data.
- [ ] Use `PROFILE`/`EXPLAIN` to validate query plans.
- [ ] Right-size heap and pagecache to the working set.
- [ ] Set up monitoring for query performance and relationship counts.
- [ ] Schedule regular online backups and test restoration.
- [ ] Prefer `MERGE` for idempotent writes; `CREATE` for append-only events.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
