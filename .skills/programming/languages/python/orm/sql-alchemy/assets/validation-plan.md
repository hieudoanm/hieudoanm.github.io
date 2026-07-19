# SQLAlchemy Best Practices: Validation Plan

Use this plan to verify work guided by [SQLAlchemy Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Profile the N+1 first**: enable echo=True or SQLAlchemy echo in dev — a select from visits per user is the #1 read-pattern bug:
- [ ] **Batch writes in single transactions** — one session.commit() for many adds, not per row (network round trips dominate)
- [ ] **bulk_insert/bulk_update_mappings for pure bulk data** (skip ORM overhead, no relationship bookkeeping) — with a named trade: no lifecycle hooks
- [ ] **Pagination via limit/offset (or keyset) in SQL** — never .all() + Python slicing for large sets
- [ ] **pool_pre_ping=True + sensible pool_size**; connection pooling is the engine's job, retry the transient deadlock
- [ ] **Test against the same DB engine as prod (Postgres via a container)** — SQLite masks type/operator differences:
- [ ] **Transaction-per-test rollback, or create/drop schema per suite** — clean isolation, no shared fixtures
- [ ] **Assert on committed state**: session.refresh(obj)/s.expunge so you test rows, not in-memory identity
- [ ] **Contract tests** — create, read, update, delete, uniqueness, constraint violation, pagination — at the persistence boundary

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
