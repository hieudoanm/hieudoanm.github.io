# Review checklist

Focused reference for **fastapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
