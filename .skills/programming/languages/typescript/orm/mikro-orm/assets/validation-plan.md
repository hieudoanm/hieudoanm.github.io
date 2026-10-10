# MikroORM Best Practices: Validation Plan

Use this plan to verify work guided by [MikroORM Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **N+1 is the #1 read bug — populate the shape you render:**
- [ ] **Projections**: fields: ["id", "email"]/select to fetch less than the whole document where the reads are hot
- [ ] **em.persist batches mutate in one flush; nativeInsert/nativeUpdate/nativeDelete for pure-data bulk.**
- [ ] **Pagination with limit/offset, or keyset on a stable field for deep pages.**
- [ ] **EXPLAIN/debug logging (debug: true) the generated SQL before reaching for indexes you don't have** — an index on every where/orderBy column first
- [ ] **Containerized real DB (Postgres for SQL path) and a fork per test** — isolation is the context, not a hack:
- [ ] **Seede @Seeder/raw fixtures typed** — deterministic rows, frozen clocks
- [ ] **Contract tests**: CRUD, uniqueness, optimistic-lock failure, populate shape, transaction rollback, soft-delete filter behavior
- [ ] **Fakes at the repo seam for unit tests; the ORM boundary gets the integration suite.**

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
