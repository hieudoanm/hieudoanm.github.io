---
name: fastapi-backend
description: Best practices for building HTTP APIs with FastAPI (Python). Use when creating, structuring, or reviewing a FastAPI app — covers routing, Pydantic models, dependency injection, async discipline, error handling, and testing.
---

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

## 3. Pydantic Models at Every Boundary

- **Request/response models are Pydantic models** — never return ORM entities directly; map to response schemas in the handler/service:

```python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)   # map from ORM row
```

- **`ConfigDict(from_attributes=True)`** lets you return ORM objects Pydantic validates/serializes — the schema is still the contract.
- **Keep schemas at the boundary**, not leaking into domain logic; compose them from parts when payloads share shape.
- **Pydantic v2**: `Field` validators, `model_validator` for cross-field rules, `model_dump(by_alias=True)` for wire output.

---

## 4. Dependency Injection

- **`Depends` is the DI mechanism** — services, config, auth, and DB sessions are dependencies, not globals:

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users", status_code=201)
def create_user(payload: UserCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return user_service.create(payload)
```

- **Deps express requirements in the signature** — callers of a route can see what it touches without reading the body.
- **Use generator deps for resources** (DB sessions) so teardown is guaranteed; use `Annotated[..., Depends(...)]` for `Repeatable` typing hints.
- **Error-encoding deps** (`Depends(get_current_user)`) centralize auth/authorization at the boundary.

---

## 5. Async & Concurrency

- **`async def` for I/O-bound endpoints** — DB/HTTP calls stay off the event loop.
- **Never block in async routes** — no `time.sleep`, no sync `requests`, no blocking DB drivers; use `asyncpg`/`aiosqlite`/`httpx.AsyncClient`.
- **Mark CPU-bound work `def` (sync)** so FastAPI runs it in a threadpool — an `async def` that does CPU work blocks the loop.
- **`BackgroundTasks` for explicit background work** (emails, webhooks) — declare intent, don't fire-and-forget with raw threads.
- **Keep DB drivers matching the deployment** — sync SQLAlchemy in a sync route is fine; mixing async routes with a sync session is where stalls creep in.

---

## 6. Error Handling

- **Centralized exception handlers** — register once, map domain errors to HTTP responses:

```python
@app.exception_handler(NotFoundError)
async def not_found(request: Request, exc: NotFoundError):
    return JSONResponse(status_code=404, content={"error": str(exc)})

@app.exception_handler(RequestValidationError)
async def validation(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"error": "invalid request", "issues": exc.errors()})
```

- **Never leak internal exceptions or stack traces** — map to API-safe messages; log the cause at system boundaries.
- **Fail fast on invalid input** — let Pydantic/Known validation raise before the service does work.
- **Services raise domain exceptions; handlers/exception handlers translate** — services don't know about FastAPI/HTTP.

---

## 7. Security & Validation

- **Validate all input through Pydantic models** — path params, query params, and body all declared and validated.
- **Use FastAPI security utilities** — `OAuth2PasswordBearer`, `HTTPBearer`, etc. for auth wiring:

```python
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    ...
```

- **Security-sensitive logic lives in the service layer**, not routes — routes only enforce the boundary.
- **Never trust client data**; keep auth/authorization boundaries explicit (dependency-guarded, not inline checks).
- **Secrets via environment/config**, not code; use pydantic-settings for typed settings.

---

## 8. Reliability & Maintainability

- **Small, focused functions**; clear intention-revealing names; no side effects at import time.
- **Stateless services where possible**; prefer composition over inheritance.
- **Log at boundaries** — request start/end, outbound integration calls, errors; structured logs.
- **Avoid clever Python tricks** in frameworks — readability wins for team-maintained code.
- **Config in one place with environments** (`dev`, `test`, `prod`) — pydantic-settings + `.env` files, no `os.getenv` scattered in modules.

---

## 9. Testing

- **`fastapi.testclient` for endpoint tests** — full stack through routing, validation, DI, exception handlers:

```python
from fastapi.testclient import TestClient

def test_creates_user(tmp):
    client = TestClient(app)
    res = client.post("/api/v1/users", json={"name": "Ada", "email": "ada@x.io"})
    assert res.status_code == 201
```

- **Test the contract** — success status/body, `422` on invalid body, `404` on missing resource, and the auth boundaries.
- **Override dependencies for isolation** — `app.dependency_overrides[get_db]` swaps the DB session per suite.
- **Deterministic tests** — test DB (SQLite file/`pytest` fixtures) reset per test; no live network in unit tests.

---

## 10. General Rules of Thumb

- **Every API boundary is a Pydantic model** — request in, response out, and never raw ORM objects.
- **Thin routes, services own the logic** — routes wire HTTP→service→schema; services are plain callables/testable.
- **Async where I/O-bound, sync-in-threadpool where CPU-bound** — mixing them wrong is the #1 perf bug in FastAPI.
- **DI via `Depends`** encodes what a route needs in its signature.
- **One error-handling layer** centralizes validation + domain-error → HTTP mapping.

---

## Quick-Start Checklist

- [ ] `api/routers` + `schemas` + `services` + `repositories` layout; routers in `main.py` via `APIRouter(prefix=...)`
- [ ] RESTful `/api/v1/...` naming; thin route handlers with no business logic
- [ ] Pydantic v2 request/response models at every boundary; `from_attributes=True` for ORM mapping
- [ ] `Depends` for DB sessions, config, auth; generator deps for resource teardown
- [ ] `async def` for I/O in I/O-bound routes; blocking calls never on the event loop
- [ ] `BackgroundTasks` for explicit background work
- [ ] Centralized exception handlers; no leaked stack traces; fail-fast validation
- [ ] OAuth2PasswordBearer/HTTPBearer auth deps; security logic in services
- [ ] Config via pydantic-settings with `dev`/`test`/`prod` environments; secrets in env
- [ ] `TestClient` contract tests (200/422/404/auth); `dependency_overrides` for isolation