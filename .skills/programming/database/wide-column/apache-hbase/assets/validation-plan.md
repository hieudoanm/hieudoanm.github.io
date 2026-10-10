# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Validation Plan

Use this plan to verify work guided by [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Poor row-key design (hot spot) — the #1 performance killer
- [ ] Overusing column families or dynamic columns (leading to sparse incantations)
- [ ] Ignoring scan ranges and using broad scans unboundedly
- [ ] Not planning compactions/major compaction → growing read latency
- [ ] Assuming ACID like a traditional DB — HBase gives row-level consistency, not cross-row transactions

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
