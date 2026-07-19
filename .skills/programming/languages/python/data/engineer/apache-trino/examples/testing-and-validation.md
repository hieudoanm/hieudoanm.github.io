# Apache Trino Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Fully-qualified `catalog.schema.table`; per-catalog semantics known
- [ ] Filters/pushdown exploited; projections narrow
- [ ] Join hints + bucketing matched; `EXPLAIN DISTRIBUTED` reviewed
- [ ] Table layout: partition by filter dimension, bucket by join key
- [ ] Resource groups + timeout/memory limits configure per tenant
- [ ] Idempotent DDL + versioned catalogs; golden-query regression tests

## Example

A team applying **Quick-Start Checklist** to a Apache Trino Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Fully-qualified `catalog.schema.table`; per-catalog semantics known**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for apache-trino-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
