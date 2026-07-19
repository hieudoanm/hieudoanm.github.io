# SQLAlchemy Best Practices: Starter Template

A reusable starting point derived from the **1. Engine & Session Lifecycle** section of [SQLAlchemy Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
engine = create_engine(
    "postgresql+psycopg://user:pass@localhost/db",
    pool_size=10,
    pool_pre_ping=True,
    echo=settings.SQL_ECHO,
)
Session = sessionmaker(bind=engine, expire_on_commit=False)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
