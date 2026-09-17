# SQLAlchemy Best Practices: Basic Usage

Best practices for using SQLAlchemy — the ORM conventions for Python relational database access. Use when writing, structuring, or reviewing SQLAlchemy — covers engine/session lifecycle, ORM model design, queries, migrations, performance, and testing.

## Scenario

Use this example as a starting point when applying **sqlalchemy-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Engine & Session Lifecycle** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
engine = create_engine(
    "postgresql+psycopg://user:pass@localhost/db",
    pool_size=10,
    pool_pre_ping=True,
    echo=settings.SQL_ECHO,
)
Session = sessionmaker(bind=engine, expire_on_commit=False)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
