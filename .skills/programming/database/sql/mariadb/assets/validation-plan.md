# MariaDB Best Practices: Validation Plan

Use this plan to verify work guided by [MariaDB Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Use **EXPLAIN** and engine-specific diagnostics
- [ ] Monitor **slow queries and lock waits**
- [ ] **Validate indexes after schema changes**
- [ ] Avoid long-running transactions
- [ ] Understand **Galera/replica behavior** (certification, lag, failover)
- [ ] Plan for **failover and recovery**; test with production-scale data
- [ ] Document **engine and configuration choices**
- [ ] Use **transactions** to ensure consistency; select **isolation levels** consciously
- [ ] **Handle deadlocks explicitly** — retry, keep transactions short
- [ ] Apply **least-privilege** database users; never plaintext secrets

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
