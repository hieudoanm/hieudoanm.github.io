# SQLite Best Practices: Validation Plan

Use this plan to verify work guided by [SQLite Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Index frequently queried columns**; avoid full table scans in hot paths
- [ ] Validate queries with **EXPLAIN QUERY PLAN** (SQLite has no EXPLAIN ANALYZE)
- [ ] **Batch writes in transactions** — per-row autocommit is the main perf killer
- [ ] Avoid unbounded result sets; test with realistic data sizes
- [ ] Be explicit about synchronous settings and durability trade-offs

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
