# Review checklist

Focused reference for **gin-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

```go
ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
defer cancel()
rows, err := repo.List(ctx)
```

- **Avoid global mutable state** — DB, verifiers, and config wired via constructors into handlers/services.
- **Deterministic behavior** — no hidden side effects, no implicit init; composition over inheritance.
- **Log at system boundaries** (HTTP, DB, external calls) via a structured logger middleware + boundary logging.

---

## 9. Testing

- **`httptest` + Gin's test mode** — build the real router, ride actual middleware:

```go
func TestGetUser_NotFound(t *testing.T) {
    gin.SetMode(gin.TestMode)
    r := app.NewRouter(serviceWithStubRepo(t))
    w := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/api/v1/users/999", nil)
    r.ServeHTTP(w, req)
    if w.Code != http.StatusNotFound { t.Fatalf("got %d, want 404", w.Code) }
}
```

- **Table-driven tests** (the Go norm) for handlers with cases: success, validation failure, not-found, unauthenticated.
- **Handlers depend on interfaces** — stub services/repos per suite (no DB, no network).
- **Test contract status codes and bodies**, not internals.

---

## 10. General Rules of Thumb

- **Standard library first** — `net/http`, `context`, `database/sql`; Gin is routing/middleware sugar, not a runtime.
- **Layers by responsibility** — handler/service/repository; interfaces only at boundaries where substitution matters.
- **Middleware is cross-cutting only** — never business logic.
- **Errors are explicit and mapped once** — `if err != nil` in handlers, `statusFrom` for HTTP.
- **Validation at the edge, invariants in services** — fail fast, never trust input.

---

## Quick-Start Checklist

- [ ] `handler/service/repository/domain` layers; thin handlers with no business logic
- [ ] RESTful `/api/v1/...`; routes composed visibly in `main`/router factory
- [ ] `context.Context` propagated handler → service → repository; timeouts applied
- [ ] Middleware for cross-cutting only (`RequestID`, `Auth`, logging/CORS); no business logic in middleware
- [ ] `binding`+struct tags validation at the edge; fail fast; never trust client input
- [ ] `if err != nil { return }` everywhere; domain-error → HTTP mapping in one place
- [ ] No leaked stack traces; log causes at boundaries
- [ ] Explicit auth middleware (`c.AbortWithStatusJSON`), policy in services
- [ ] No global mutable state; deps injected via constructors; secrets in env
- [ ] `httptest` + table-driven handler tests (200/400/404/401) on stubbed interfaces
