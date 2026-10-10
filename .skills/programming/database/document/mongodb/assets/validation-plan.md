# MongoDB Best Practices: Validation Plan

Use this plan to verify work guided by [MongoDB Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Index all frequently queried fields**; understand index selectivity
- [ ] Monitor **slow queries and query plans** (db.currentOp, profiler)
- [ ] **Avoid N+1 query patterns** (batch reads, aggregation)
- [ ] Use **safe pagination** — bounded skip or stable keys, not unbounded skips
- [ ] **Plan shard keys before scaling** (high-cardinality, evenly distributed, no monotonic hotspot)
- [ ] Test aggregation pipelines with **realistic data volumes**
- [ ] **Never expose MongoDB directly to the public internet**
- [ ] Enable **authentication + role-based access control**; least-privilege users
- [ ] **Validate data at the application layer**; consider **schema validation ($jsonSchema)**
- [ ] Encrypt sensitive fields if required

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
