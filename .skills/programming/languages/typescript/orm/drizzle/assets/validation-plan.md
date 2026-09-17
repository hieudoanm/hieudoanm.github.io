# Drizzle ORM Best Practices: Validation Plan

Use this plan to verify work guided by [Drizzle ORM Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Prepared statements for hot, repeatable queries** — .prepare("name") a repeatable query and call it with args; one parse, your DB caches the plan:
- [ ] **$queryRaw is _not_ the escape hatch it is in other ORMs — it's a first-class tool**; use tagged sql\\`` freely for aggregates, JSON columns, and reporting where the builder reads worse than SQL
- [ ] **Indexes live in the schema** (index(...)) — add them on the exact where/orderBy/join predicates; generate them into migrations like any other schema change
- [ ] **Avoid per-row awaited queries inside loops** — batch (db.insert(...).values([...]), Promise.all of $queryRaw batched) or relational-query the whole set; Drizzle gives you no hiding, so the SQL shows the cost
- [ ] **Seed with plain scripts against the schema module** — tsx src/db/seed.ts building insert(...).values([...]); keep fixtures typed by $inferInsert so seeds can't drift from schema:
- [ ] **Tests: SQLite in-memory (or a dedicated test DB)** — Drizzle supports multiple dialects, so unit-test the schema/relations against sqlite/pg-mem with the same schema module; use migrate or push to build the test schema
- [ ] **Reset per suite** — truncate tables (delete $ from ...) in a beforeEach/afterEach, never accumulate across tests
- [ ] **batch/$queryRaw for fast bulk fixture loading** in tests and migrations — one round-trip over per-row inserts

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
