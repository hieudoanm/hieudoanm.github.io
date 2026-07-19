# Implementation notes

Focused reference for **fastapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
