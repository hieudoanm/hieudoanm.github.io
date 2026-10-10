# SQLAlchemy Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test against the same DB engine as prod (Postgres via a container)** — SQLite masks type/operator differences:
- **Transaction-per-test rollback, or create/drop schema per suite** — clean isolation, no shared fixtures.
- **Assert on committed state**: `session.refresh(obj)`/`s.expunge` so you test rows, not in-memory identity.
- **Contract tests** — create, read, update, delete, uniqueness, constraint violation, pagination — at the persistence boundary.

## Example

```python
@pytest.fixture
def session(tmp_path):
    engine = create_engine("postgresql://...", )
    Base.metadata.create_all(engine)
    with sessionmaker(bind=engine)() as s:
        yield s
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for sqlalchemy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
