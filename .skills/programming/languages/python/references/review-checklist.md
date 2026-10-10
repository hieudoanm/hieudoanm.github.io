# Review checklist

Focused reference for **python-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
