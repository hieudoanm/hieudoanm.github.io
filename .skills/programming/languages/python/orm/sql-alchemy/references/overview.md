# Overview

Focused reference for **sqlalchemy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# SQLAlchemy Best Practices

SQLAlchemy is Python's relational toolkit: a **Core** (SQL expression language) and an **ORM** on top. Practical SQLAlchemy leans on **short-lived sessions with a transaction boundary (`Session`/`sessionmaker` + context manager), typed models with explicit relationships, and explicit queries (`select()`) over magic strings**. It wraps SQL rather than hiding it — a query you can't explain in SQL is a query you shouldn't ship with magic.

---

## 1. Engine & Session Lifecycle

- **One engine per database config; sessions per request/operation, not long-lived:**

```python
engine = create_engine(
    "postgresql+psycopg://user:pass@localhost/db",
    pool_size=10,
    pool_pre_ping=True,
    echo=settings.SQL_ECHO,
)
Session = sessionmaker(bind=engine, expire_on_commit=False)
```

- **Open a session, do the work, commit/rollback once** — use the context-manager form so `close()` is guaranteed:

```python
with Session() as s:
    user = s.get(User, id)          # read
    s.add(user)
    s.commit()
```

- **`rollback()` on exception; never leave an uncommitted transaction dangling** (holds locks, hides state).
- **`expire_on_commit=False`** keeps objects usable after commit (values stay loaded; avoids lazy-load surprises in web handlers).
- **Fetch size / `stream_results` + server-side cursors for large result sets; `sessionmaker(bind=engine)` per app, fakes per test.**

---
