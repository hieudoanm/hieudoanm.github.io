# Prisma ORM Best Practices: Validation Plan

Use this plan to verify work guided by [Prisma ORM Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **N+1 lives in include and per-row queries** — batch with include/relation loading, or group by key (Promise.all + findUnique on ids) instead of a query per parent row
- [ ] **Use select to trim payloads** (see §4) and **raw queries for hot/reporting paths** where the client abstraction's JOIN/shape control is insufficient — prisma.$queryRaw\...\`` keeps parameter binding safe
- [ ] **Index the predicates** (schema §2) — where on un-indexed columns is a table scan masquerading as an API
- [ ] **Set connection limits/timeouts to match the pool** (connection_limit) and keep transactions short (§5) so the pool doesn't starve
- [ ] **Log/slow-query instrumentation (candidateInterceptors/client middleware) in prod to find the 1% queries** — profile before micro-optimizing
- [ ] **Seed via prisma/seed.ts run by prisma db seed** — put reproducible fixtures behind a script, not ad-hoc scripts scattered in src:
- [ ] **Tests: a dedicated test database, reset per suite, never the dev DB** — migrate + truncate between suites; use DATABASE_URL swapping and a fixture factory, not prod data
- [ ] **createMany for bulk inserts over per-row create** in migrations/imports/tests — one round-trip instead of N

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
