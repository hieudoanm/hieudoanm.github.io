# Apache Trino Best Practices: Workflow Checklist

A practical run sheet for applying [Apache Trino Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Catalog & Schema Model: **catalog.schema.table — every table fully qualified; multiple catalogs joined in one query:**
- [ ] 1. Catalog & Schema Model: **Default catalog/schema set per-connection for readability — but the qualified form travels.**
- [ ] 2. Query Patterns: **Push filters/aggregations down — let the connector do the work; Trino streams:**
- [ ] 2. Query Patterns: **Project-only columns (SELECT col1) we push; wide SELECT * hurts scanning costs.**
- [ ] 3. Joins & Performance Levers: **Join style hints (/*+ /* */ hints) where the planner mis-picks:**
- [ ] 3. Joins & Performance Levers: **Broadcast small tables (BROADCAST hint); bucketed joins on the join key with matching bucket count.**
- [ ] 4. Bucketing & Table Design: **Bucketing pays on join keys; choose bucket count ≈ task parallelism:**
- [ ] 4. Bucketing & Table Design: **Partition by the filter-common dimension (dt), bucket by join keys.**
- [ ] 5. Resource Management: **Resource groups/CGO provide fair execution — tag workloads (SET SESSION resource_group?) and bound concurrency:**
- [ ] 5. Resource Management: **Query timeouts + mem limits (query.max-memory, query.max-total-memory-per-node).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
