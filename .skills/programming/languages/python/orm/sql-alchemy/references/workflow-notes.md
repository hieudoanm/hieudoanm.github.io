# Workflow notes

Focused reference for **sqlalchemy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Model Design

- **Declarative ORM models are the table contract:**

```python
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    active: Mapped[bool] = mapped_column(default=True)
    visits: Mapped[list["Visit"]] = relationship(back_populates="user")
```

- **`Mapped[T]`/`mapped_column` annotations are the schema and the type hint — one source of truth.**
- **Tight column types**: `String(n)`, `Numeric(decimal)` for money (never `Float`!), `DateTime(timezone=True)` for instants, `Boolean`, `Enum`/`check` constraints for closed sets.
- **Relationships explicit with `back_populates` on both sides and `lazy=` chosen deliberately** (`"selectin"`/`"joined"` for eager hot paths, `"raise"` to forbid accidental lazy load).
- **Conventions via `DeclarativeBase`/`MetaData` naming convention** — index/constraint names deterministic for migrations.

---

## 3. Querying

- **2.0-style `select()` everywhere over legacy `query()`:**

```python
stmt = (
    select(User)
    .where(User.active == True, User.email.like("%@acme.io"))
    .order_by(User.created_at.desc())
    .limit(50)
)
users = session.scalars(stmt).all()
```

- **Counts/aggregates in SQL**: `func.count()`, `func.sum()` in the select, not len() after loading all rows.
- **`selectinload`/`joinedload` for eager loading by N+1's shape; never lazy-load in hot loops.**
- **`filter`/`where` on real columns — not functions of columns (`User.email.lower()`), which defeat indexes.**
- **Use `.scalars()` for single-column/map cases; `.one()`/`.scalar_one_or_none()` for precision (raise on 0-or-2 rows rather than silently pick).**

---
