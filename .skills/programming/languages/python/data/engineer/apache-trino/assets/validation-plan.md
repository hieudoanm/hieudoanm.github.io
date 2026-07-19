# Apache Trino Best Practices: Validation Plan

Use this plan to verify work guided by [Apache Trino Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Join style hints (/*+ /* */ hints) where the planner mis-picks:**
- [ ] **Broadcast small tables (BROADCAST hint); bucketed joins on the join key with matching bucket count.**
- [ ] **EXPLAIN / EXPLAIN (TYPE DISTRIBUTED) before heavy queries — identify shuffle vs pushdown.**
- [ ] **Skew handled by salt/re-keying; session max_workers_per_task tuned by roadmaps.**

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
