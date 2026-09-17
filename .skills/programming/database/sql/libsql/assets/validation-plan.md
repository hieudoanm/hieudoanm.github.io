# libSQL Best Practices: Validation Plan

Use this plan to verify work guided by [libSQL Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Optimize for local reads** — read path should not touch the network
- [ ] **Batch writes** to reduce sync overhead
- [ ] Index for real query patterns; **avoid large transactions over remote connections**
- [ ] Measure latency for **read vs write paths** separately
- [ ] **Test offline-first scenarios explicitly**; load-test with replication enabled
- [ ] Document **consistency expectations** per feature

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
