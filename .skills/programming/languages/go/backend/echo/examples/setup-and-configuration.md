# Echo Best Practices: 2. Middleware

## Source guidance

This example applies the **2. Middleware** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Middleware is a function wrapping the handler; order matters** (Logger → Recoverer → CORS → Auth → business):
- **Echo's built-in middleware** (`Logger`, `Recover`, `Gzip`, `CORS`) are the defaults; custom ones follow the same signature.
- **Auth middleware on the protected group** — never per-route; the group is the security domain.
- **Middleware returns error** — an auth failure can `return echo.ErrUnauthorized` instead of swallowing the failure silently.
- **Request-id before logging/auth** — spans carry the identity; the logger writes the ID out.

## Example

```go
func requestID(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        id := uuid.NewString()
        c.Set("request_id", id)
        c.Response().Header().Set("X-Request-Id", id)
        return next(c)
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for echo-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
