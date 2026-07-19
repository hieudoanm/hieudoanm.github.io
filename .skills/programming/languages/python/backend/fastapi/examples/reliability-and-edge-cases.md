# FastAPI Backend Best Practices: 7. Security & Validation

## Source guidance

This example applies the **7. Security & Validation** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Validate all input through Pydantic models** — path params, query params, and body all declared and validated.
- **Use FastAPI security utilities** — `OAuth2PasswordBearer`, `HTTPBearer`, etc. for auth wiring:
- **Security-sensitive logic lives in the service layer**, not routes — routes only enforce the boundary.
- **Never trust client data**; keep auth/authorization boundaries explicit (dependency-guarded, not inline checks).
- **Secrets via environment/config**, not code; use pydantic-settings for typed settings.

## Example

```python
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    ...
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for fastapi-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
