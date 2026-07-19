# SQLAlchemy Best Practices: 2. Model Design

## Source guidance

This example applies the **2. Model Design** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Declarative ORM models are the table contract:**
- **`Mapped[T]`/`mapped_column` annotations are the schema and the type hint — one source of truth.**
- **Tight column types**: `String(n)`, `Numeric(decimal)` for money (never `Float`!), `DateTime(timezone=True)` for instants, `Boolean`, `Enum`/`check` constraints for closed sets.
- **Relationships explicit with `back_populates` on both sides and `lazy=` chosen deliberately** (`"selectin"`/`"joined"` for eager hot paths, `"raise"` to forbid accidental lazy load).
- **Conventions via `DeclarativeBase`/`MetaData` naming convention** — index/constraint names deterministic for migrations.

## Example

```python
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    active: Mapped[bool] = mapped_column(default=True)
    visits: Mapped[list["Visit"]] = relationship(back_populates="user")
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for sqlalchemy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
