# SQLAlchemy Best Practices: 5. Performance

## Source guidance

This example applies the **5. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Profile the N+1 first**: enable `echo=True` or `SQLAlchemy echo` in dev — a `select from visits` per user is the #1 read-pattern bug:
- **Batch writes in single transactions** — one `session.commit()` for many `add`s, not per row (network round trips dominate).
- **`bulk_insert`/`bulk_update_mappings` for pure bulk data** (skip ORM overhead, no relationship bookkeeping) — with a named trade: no lifecycle hooks.
- **Pagination via `limit`/`offset` (or keyset) in SQL** — never `.all()` + Python slicing for large sets.
- **`pool_pre_ping=True` + sensible `pool_size`**; connection pooling is the engine's job, retry the transient deadlock.

## Example

```python
stmt = select(User).options(selectinload(User.visits)).where(...)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for sqlalchemy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
