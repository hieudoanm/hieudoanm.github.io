# FastAPI Backend Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`fastapi.testclient` for endpoint tests** — full stack through routing, validation, DI, exception handlers:
- **Test the contract** — success status/body, `422` on invalid body, `404` on missing resource, and the auth boundaries.
- **Override dependencies for isolation** — `app.dependency_overrides[get_db]` swaps the DB session per suite.
- **Deterministic tests** — test DB (SQLite file/`pytest` fixtures) reset per test; no live network in unit tests.

## Example

```python
from fastapi.testclient import TestClient

def test_creates_user(tmp):
    client = TestClient(app)
    res = client.post("/api/v1/users", json={"name": "Ada", "email": "ada@x.io"})
    assert res.status_code == 201
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for fastapi-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
