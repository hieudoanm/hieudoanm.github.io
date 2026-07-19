# OpenSearch Best Practices: Validation Plan

Use this plan to verify work guided by [OpenSearch Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Avoid deep pagination with from + size** — prefer **search_after/scroll** for large result sets
- [ ] **Limit aggregation cardinality**
- [ ] **Avoid over-sharding**; tune shard size for data volume
- [ ] **Monitor JVM heap, GC, and circuit breakers**
- [ ] Test queries with **realistic data sizes**; explain query cost and cluster impact
- [ ] Use **ISM** to manage index lifecycle (rollover, deletion, snapshots)
- [ ] **Enable and configure the OpenSearch Security plugin**
- [ ] Use **least-privilege roles**; **separate read, write, and admin permissions**
- [ ] **Never expose cluster-admin credentials to applications**
- [ ] **Audit destructive operations**; protect **snapshot repositories**

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
