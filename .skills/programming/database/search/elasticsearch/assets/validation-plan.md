# Elasticsearch Best Practices: Validation Plan

Use this plan to verify work guided by [Elasticsearch Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Design queries to limit scanned documents**
- [ ] **Avoid deep pagination with from + size** — prefer **search_after** (or PIT) for deep paging
- [ ] **Limit aggregation cardinality** (terms on high-cardinality fields is memory-heavy)
- [ ] **Tune shard count for index size — avoid over-sharding**
- [ ] Monitor **heap usage and circuit breakers**; watch slow queries

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
