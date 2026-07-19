# Sequelize Best Practices: Validation Plan

Use this plan to verify work guided by [Sequelize Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **validate at the model boundary — notEmpty, isEmail, custom:
- [ ] **Hooks (beforeValidate, beforeSave, afterUpdate) small and narrowly scoped** — they run on every instance path, so keep them side-effect-light
- [ ] **instance.getDataValue/setDataValue across hooks; normalize in beforeValidate (trim/lowercase) — one place.**
- [ ] **Unique violations surface as DB errors** — catch/map them into domain errors at the service boundary, don't pre-check then race
- [ ] **N+1 is the first suspect** — include eagerly or batch by ID list:
- [ ] **findAll({ raw: true }) for read-only payloads** — skip instance wrapping when you render JSON only
- [ ] **Bulk**: bulkCreate with { transaction: true }/chunkSize for load; updates via update/increment (single statement) over read-modify-write
- [ ] **Indexes for where/order keys declared in a migration** — an unindexed findAll is the usual "slow query" story
- [ ] **EXPLAIN ANALYZE/EXPLAIN the generated SQL (logging: console.log in dev) before optimizing anything else.**
- [ ] **Integration tests against the same DB engine (Postgres container); sequelize.sync({ force: true }) per suite**:

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
