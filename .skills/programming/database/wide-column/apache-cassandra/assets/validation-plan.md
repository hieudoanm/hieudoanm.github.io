# apache-cassandra: Validation Plan

Use this plan to verify work guided by [apache-cassandra](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Missing a partition key → full-partition scans that overwhelm nodes
- [ ] ALLOW FILTERING on large tables → full cluster scan
- [ ] Unbounded partitions and hot partition keys
- [ ] Ignoring repair → silent diverging replicas
- [ ] Assuming Cassandra provides ACID transactions like relational DBs

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
