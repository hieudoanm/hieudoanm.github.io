# Review checklist

Focused reference for **sqlalchemy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Testing

- **Test against the same DB engine as prod (Postgres via a container)** — SQLite masks type/operator differences:

```python
@pytest.fixture
def session(tmp_path):
    engine = create_engine("postgresql://...", )
    Base.metadata.create_all(engine)
    with sessionmaker(bind=engine)() as s:
        yield s
```

- **Transaction-per-test rollback, or create/drop schema per suite** — clean isolation, no shared fixtures.
- **Assert on committed state**: `session.refresh(obj)`/`s.expunge` so you test rows, not in-memory identity.
- **Contract tests** — create, read, update, delete, uniqueness, constraint violation, pagination — at the persistence boundary.

---

## General Rules of Thumb

- **Session per operation, transaction boundary explicit, `expire_on_commit=False`.**
- **Models annotated with `Mapped[T]` are the schema contract — tight types, no `Float` money.**
- **`select()` 2.0 style; eager-load by N+1 shape; count in SQL.**
- **Alembic migrations reviewed; one change per revision.**
- **Test on Postgres, absorb the SQLite mismatch at your own risk.**
- **`echo` in dev to see the real SQL your code emits.**

---

## Quick-Start Checklist

- [ ] One engine + `sessionmaker` per app; session per request/work unit
- [ ] Context-managed `Session`; single commit/rollback; `expire_on_commit=False`
- [ ] `Mapped[T]` models; explicit `back_populates` + chosen `lazy=`
- [ ] `Numeric` for money, `DateTime(timezone=True)` instants, indexes for hot keys
- [ ] `select()` + `where`/`order_by`/`limit`; `.scalars()`; aggregates in SQL
- [ ] Eager loading via `selectinload`/`joinedload`; no N+1 in loops
- [ ] Alembic migrations reviewed per change; downgrades reversible
- [ ] Batch writes per transaction; `bulk_*` for pure bulk; keyset pagination
- [ ] `pool_pre_ping`; test on Postgres; transaction-isolated tests
