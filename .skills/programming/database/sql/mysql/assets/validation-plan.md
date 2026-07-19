# MySQL Best Practices: Validation Plan

Use this plan to verify work guided by [MySQL Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Use **EXPLAIN / EXPLAIN ANALYZE** and monitor **slow query log**
- [ ] Add and validate indexes deliberately — every index costs writes
- [ ] **Avoid long-running transactions** (hold locks, grow undo)
- [ ] Tune **connection pools** (honor max_connections; pool below it)
- [ ] Understand **replication lag** and plan failover/recovery
- [ ] Test with **production-like data sizes**
- [ ] Use **transactions** to guarantee consistency; choose **isolation levels** deliberately (REPEATABLE READ default vs READ COMMITTED)
- [ ] **Handle deadlocks explicitly** — retry on ERROR 1213; keep transactions short
- [ ] Use **least-privilege** database users; never plaintext secrets
- [ ] Protect against **SQL injection** at the application layer (bind parameters)

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
