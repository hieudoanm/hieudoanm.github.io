# Overview

Focused reference for **fastapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# FastAPI Backend Best Practices

FastAPI is an async-first, standards-based Python framework built on Starlette and Pydantic v2: type-annotated request/response models drive validation, serialization, generated OpenAPI docs, and dependency injection. Best practice here is about keeping route handlers thin, modelling every API boundary with Pydantic (never exposing ORM models), validating input declaratively, and keeping I/O-bound endpoints `async` without ever blocking the event loop.

---

## 1. Core Stack

- **Python 3.10+**; FastAPI (latest stable); Pydantic **v2**
- SQLAlchemy (or async driver) for persistence; `python-dotenv`/pydantic-settings for config
- `httpx`/`pytest` + `fastapi.testclient` (Starlette) for tests

```bash
pip install "fastapi[standard]" pydantic-settings sqlalchemy
```

- **Pin Python to the repo standard** (`3.10+`), not the platform default — FastAPI features and typing idioms shift with the minor version.

---

## 2. Project Structure & Routing

- **Organize by responsibility, not all in one file** — `api/routers`, `schemas`, `services`, `repositories`/`db`:

```text
app/
  main.py            # app factory, router mounting, exception handlers
  api/routers/       # user.py, order.py — thin HTTP wiring only
  schemas/           # Pydantic request/response models
  services/          # business logic
  repositories/      # persistence
```

- **RESTful resource naming** (`/users`, `/orders/{id}`); **version explicitly** (`/api/v1/...`).
- **Mount routers with `APIRouter(prefix=...)`** — keep prefixes at the router level, not scattered in paths.
- **Keep route handlers thin** — route → validate → call service → return schema; no business logic inline.

---
