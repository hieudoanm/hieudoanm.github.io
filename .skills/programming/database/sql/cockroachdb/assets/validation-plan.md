# CockroachDB Best Practices: Validation Plan

Use this plan to verify work guided by [CockroachDB Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Optimize queries to minimize node fan-out**
- [ ] **Batch writes inside transactions**; avoid long-running transactions
- [ ] Monitor **contention and retry rates** (crdb_internal, metrics)
- [ ] **Index carefully to avoid write amplification**
- [ ] Load-test with **realistic geography**; measure **tail latency, not just averages**
- [ ] Document **SLOs and consistency expectations**

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
