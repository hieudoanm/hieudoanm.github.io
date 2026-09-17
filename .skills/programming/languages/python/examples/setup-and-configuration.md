# Python Best Practices: 3. Data Classes & Models

## Source guidance

This example applies the **3. Data Classes & Models** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`@dataclass` over hand-written `__init__`** — `__eq__`, `__repr__`, and (with `frozen=True`) hashability for free:
- **`frozen=True` for value objects** — immutable records behave like values and are safe to share; use `dataclasses.replace(obj, field=...)` for updates instead of mutating.
- **`Enum` over string/int constants** — a closed set, type-checkable, with exhausted `match`:
- **`TypedDict` for dict-shaped data crossing JSON/API boundaries** — describes known keys without a class; keep runtime values as plain dicts.
- **`IntEnum` where numeric values have meaning; `StrEnum` (3.11+) for string enums** — replaces ad-hoc constant classes.

## Example

```python
@dataclass(frozen=True)
class User:
    id: int
    name: str
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for python-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
