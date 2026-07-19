# TypeORM Best Practices: Validation Plan

Use this plan to verify work guided by [TypeORM Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **N+1 is the #1 read bug** — eager-load with relations:/leftJoinAndSelect, or cheat with a window/keyset of IDs
- [ ] **Pagination in SQL (take/skip or keyset on a stable column)** — never load-all + array.slice
- [ ] **select projections sever unneeded columns; find with raw only when the shape really is raw.**
- [ ] **Batch writes in one transaction** — N inserts are N round trips otherwise:
- [ ] **pool_size/max + pool_timeout respected; retry transient deadlocks (40001/40P01) with named backoff.**
- [ ] **Explain the slow ones** — query: ExplainAnalyze or the DB's EXPLAIN ANALYZE on the generated SQL
- [ ] **Integration tests against the same DB engine (Postgres container)** — SQLite masks type/operator behavior:
- [ ] **Contract tests**: create, update, delete, uniqueness violation, relation eager-load, transaction rollback
- [ ] **Fakes at the repo seam for unit tests; the entity/DB boundary gets the real integration suite.**
- [ ] **Deterministic ordering/timestamps** — seeded fixtures, frozen clocks, stable order by id

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
