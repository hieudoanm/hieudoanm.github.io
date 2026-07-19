# Gorilla Best Practices: 2. Middleware

## Source guidance

This example applies the **2. Middleware** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Middleware wraps the handler** — `func(next http.Handler) http.Handler` or `mux.MiddlewareFunc`:
- **`r.Use()` to add middleware to the router/subrouter** — order matters.
- **Auth middleware on the protected subrouter** — never per-route; the subrouter is the security domain.
- **Recovery/panic handling via custom middleware** (`recover` inside the wrapper) or the stdlib `recover`:

## Example

```go
func requestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := context.WithValue(r.Context(), requestIDKey, uuid.NewString())
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for gorilla-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
