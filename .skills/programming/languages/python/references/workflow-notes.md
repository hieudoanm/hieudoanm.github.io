# Workflow notes

Focused reference for **python-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. Data Classes & Models

- **`@dataclass` over hand-written `__init__`** — `__eq__`, `__repr__`, and (with `frozen=True`) hashability for free:

```python
@dataclass(frozen=True)
class User:
    id: int
    name: str
```

- **`frozen=True` for value objects** — immutable records behave like values and are safe to share; use `dataclasses.replace(obj, field=...)` for updates instead of mutating.
- **`Enum` over string/int constants** — a closed set, type-checkable, with exhausted `match`:

```python
class Status(Enum):
    ACTIVE = "active"
    PAUSED = "paused"
```

- **`TypedDict` for dict-shaped data crossing JSON/API boundaries** — describes known keys without a class; keep runtime values as plain dicts.
- **`IntEnum` where numeric values have meaning; `StrEnum` (3.11+) for string enums** — replaces ad-hoc constant classes.

---

## 4. Error Handling

- **Narrow, specific `except`** — catch `ValueError` where `ValueError` is possible, not bare `except:`. Broad catches (`except Exception`) hide failure paths; broad swallows (`except Exception: pass`) are almost always wrong.

```python
try:
    return int(raw)
except ValueError:
    log.warning("not an int: %r", raw)
    return 0
```

- **Raise with context and chaining** — `raise ... from cause` preserves the original traceback and makes causality explicit:

```python
try:
    parse(spec)
except ParseError as exc:
    raise ConfigError(f"bad spec {path}") from exc
```

- **`if`/`raise` guards before doing work** (fail fast); **`assert` only for programmer invariants**, which the interpreter can strip with `-O`.
- **Log, don't print, in libraries and services** — routing through `logging` keeps control of sinks and formats at the app boundary.
- **Custom exceptions with clear names** (`class ConfigError(Exception)`) for domain failures; subclass from the most specific builtin that fits.
