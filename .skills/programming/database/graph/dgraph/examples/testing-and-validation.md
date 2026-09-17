# Dgraph: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Dgraph. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Design the GraphQL schema with `@id`, `@index`, and `@reverse` directives.
- [ ] Use `dgraph live` or `bulk` for initial load; shard for production.
- [ ] Validate query plans with `EXPLAIN` in DQL or query metrics in the UI.
- [ ] Tune `--cache_size_mb` and provision RAM for the working set.
- [ ] Configure backup schedule (S3/GCS/local) and test restore.
- [ ] Monitor latency, rejected transactions, and memory usage.
- [ ] Use `@upsert` for idempotent writes under concurrency.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
