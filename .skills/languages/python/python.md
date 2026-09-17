---
name: python-best-practices
description: Idiomatic Python best practices covering project structure, type hints, dataclasses, error handling, pathlib, generators, packaging, testing and tooling. Use when writing, structuring, or reviewing Python code.
---

# Python Best Practices

Python is a dynamically typed language whose culture prizes readability and explicit, obvious code. The modern "best practice" stack — type hints, `dataclasses`, `pathlib`, positional-only/keyword-only parameters — exists to give a dynamic language guardrails and self-documentation that the interpreter itself doesn't enforce. This skill follows those modern conventions.

---

## 1. Project Structure

Modern packaging with `pyproject.toml` and a **`src/` layout**:

```txt
myapp/
├── pyproject.toml
├── src/
│   └── myapp/
│       ├── __init__.py
│       ├── __main__.py
│       ├── config.py
│       ├── models.py
│       ├── services/
│       └── cli.py
└── tests/
    ├── conftest.py
    ├── test_config.py
    └── test_services.py
```

- **`src/` layout** (`src/myapp/`) so tests import the installed package, not your working directory — catches missing-`__init__` and packaging bugs early.
- **Keep `__init__.py` minimal or empty** — no import-time side effects; factories/version strings go in modules, not in package import.
- Module and package names: `snake_case`, short, and importable; one logical module per file. Avoid a `utils.py` grab-bag — prefer focused modules named for what they contain.
- Tooling lives in `pyproject.toml` (ruff, pytest, mypy/pyright config) — no scattered `setup.cfg`/`.flake8`/`mypy.ini` unless required.

---

## 2. Type Hints & Typing

- **Annotate all public function signatures** — the signature is the contract; static checkers (`mypy`/`pyright`) and your IDE both read it:

```python
def get_user(user_id: int, db: Database, *, include_deleted: bool = False) -> User | None: ...
```

- **`from __future__ import annotations`** (Python 3.7+; default in 3.12+) so all hints are lazy and `|` unions work everywhere.
- **Prefer the `X | None` union syntax** over `Optional[X]` and `str | None` over `Optional[str]` — concise and consistent with `list[str]` over `List[str]`.
- **`typing.Protocol` for duck types** — structural interfaces you can test against without forcing inheritance:

```python
class Named(Protocol):
    name: str

def greet(obj: Named) -> str: return f"hi {obj.name}"
```

- **Use narrow primitives (`int`, `str`) plus `NewType`/enums for domain ids**; don't silently fall back to `Any` — `Any` dissolves the contract.
- **Annotate return types on every public function** — even `-> None`; it makes intent explicit.

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

---

## 5. Paths & File I/O

- **`pathlib.Path` over `os.path`** — composable, readable, cross-platform:

```python
path: Path = Path.home() / "config" / "app.yaml"
if path.exists():
    data = path.read_text()
```

- **Use the `Path` methods** (`read_text`, `write_text`, `glob`, `iterdir`, `with_suffix`) instead of `open()`/string concatenation; build paths with `/`, never `+` or f-strings.
- **Files: use `with open(...)`** — you get guaranteed close; **binary vs text explicit** via `"rb"`/`"r"` vs `Path.read_bytes()`/`read_text()`.
- **Check-then-act races: prefer catch-and-handle** for existence checks (`try: path.read_text() except FileNotFoundError: ...`) over `if exists()` + read.

---

## 6. Iteration & Generators

- **Generators over materialized lists for large sequences** — `yield` one item at a time instead of building a whole list in memory:

```python
def walk_rows(rows: Iterable[Row]) -> Iterator[Row]:
    for row in rows:
        if row.active:
            yield row
```

- **Comprehensions over `for`-with-`append`** — `[f(x) for x in xs if c(x)]` expresses intent in one line; avoid abusing them with side effects.
- **Prefer iterators and `itertools`** — `islice`, `groupby`, `chain`, `takewhile` read as data pipelines instead of indexed loops.
- **Never modify a list while iterating it** — build a new list/`filter` or iterate over a copy.
- **`dict`/`set`/`Counter` for grouping and counting** over manual accumulate; `collections.defaultdict` for nested.

---

## 7. Functions & Idioms

- **Small, single-purpose functions** — if a function needs paragraphs to explain, split it; keep the happy path flat with early returns.
- **Explicit parameters over tricks** — prefer keyword-only args (`def make(name, *, force: bool = False)`) for option-like flags, default values over sentinel-mutation.
- **Context managers (`with`) for resources and scoped state** — `with open`, `with lock`, `with timer` — never hand-manage `enter`/`exit`.
- **`match` statement (3.10+) over deep `if` chains** for dispatch on structure — and `match` over `Enum` variants is exhaustive-seeming by convention.
- **Prefer built-ins and stdlib before third-party deps** — `functools`, `itertools`, `pathlib`, `dataclasses`, `typing`, `collections` cover most needs; the stdlib is the default contract.
- **`functools.wraps`/decorators for cross-cutting concerns** sparingly — a decorator hides control flow; reach for it when it genuinely removes duplication.

---

## 8. Packaging & Tooling (Non-negotiable)

- **`pyproject.toml`** with a build backend (`hatchling`/`setuptools`) defines the package; use `[project]` metadata and `requires-python`.
- **`uv` (or `pip`+`venv`) + `uv.lock`/`requirements.txt`** for reproducible environments; never install into the system Python.
- **`ruff` for lint + format** (`ruff check`, `ruff format`) — fast, single-tool, catches unused imports, bug-prone patterns, and enforces PEP 8.
- **`mypy` or `pyright` in strict mode** in CI — catch the type errors that Python won't at runtime.
- **`pytest` as the runner** — fixtures, parametrize, plugins, clear failure output.

---

## 9. Testing

- **`pytest` + fixtures over unittest boilerplate** — `conftest.py` for shared setup; fixtures inject, don't global-setup:

```python
@pytest.fixture
def db(tmp_path: Path) -> Database:
    return Database(tmp_path / "test.db")

def test_load_saved_key(db: Database) -> None:
    db.put("k", "v")
    assert db.get("k") == "v"
```

- **`@pytest.mark.parametrize` for table-driven cases** — data and expectation in one readable declaration.
- **Name tests as sentences** — `def test_returns_404_when_user_not_found():` reads as a specification.
- **Tests import via the public API**, not internals — black-box tests catch design issues that white-box ones miss.
- **Keep tests isolated** — each test gets fresh fixtures; no ordering dependencies, no shared mutable state.
- **Mock the boundaries** (network, clock, filesystem) with `monkeypatch`/`freeze_time`, not the logic under test.

---

## 10. General Rules of Thumb

- **Explicit is better than implicit; obvious over clever** — the Zen guidelines are the style guide.
- **Type hints are the new docstrings for signatures** — annotate what flows through; keep `#` comments for *why*, not *what*.
- **Flat structure over deep nesting** — guard clauses, early returns, and comprehensions keep contexts small.
- **No global mutable state** — module-level mutable singletons make tests order-dependent; inject via parameters (`Context`, `Session`, `DB`).
- **Idiomatic, standard-library-first, consistent formats** — `ruff format` removes the style debate entirely.
- **Don't repeat the same logic in multiple shapes** — one canonical form, others delegate (DRY keeps name/behaviour in sync).

---

## Quick-Start Checklist

- [ ] `pyproject.toml` + `src/` layout
- [ ] All public functions type-annotated, returns included
- [ ] `from __future__ import annotations`; `X | None` unions
- [ ] `@dataclass(frozen=True)` / `Enum` / `TypedDict` over hand-rolled models
- [ ] Narrow `try/except`; `raise ... from` preserved chains
- [ ] `pathlib.Path` used, no `os.path` string plumbing
- [ ] Generators/lazy iteration for large sequences
- [ ] `ruff check` + `ruff format` + `mypy`/`pyright` green in CI
- [ ] `pytest` fixtures and `parametrize`; tests named as sentences
- [ ] No bare `except:`; no silent `except: pass`
- [ ] Dependencies injected, no mutable module globals