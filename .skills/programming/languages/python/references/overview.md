# Overview

Focused reference for **python-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
