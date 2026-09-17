---
name: gin-backend
description: Best practices for building HTTP APIs with Gin (Go). Use when creating, structuring, or reviewing a Gin app — covers routing, middleware, context, validation, error handling, and testing.
---

# Gin Backend Best Practices

Gin is a fast, middleware-based HTTP framework for Go built on `net/http`. It keeps Go's explicitness (interfaces, `context.Context`, explicit errors) while adding routing, middleware, and JSON convenience. Best practice is standard-library-first: thin handlers, services own business logic, repositories own persistence, and business logic never appears in middleware.

---

## 1. Core Stack

- Go **1.21+**; Gin (latest stable)
- Standard library first; add dependencies deliberately (DB driver, JWT lib)
- SQL databases (PostgreSQL/MySQL) via `database/sql` or pgx; `testify`/`httptest` for tests

```bash
go get github.com/gin-gonic/gin
```

- **Pin Go via `go.mod`**; use the repo's Go toolchain (`go.mod` toolchain directive) for reproducible builds.

---

## 2. Project Structure & Routing

- **Separate layers clearly** — `handler` (HTTP), `service` (business), `repository` (data), `domain` (models):

```text
cmd/api/main.go        # wiring: router + middleware + deps
internal/
  handler/users.go     # gin.HandlerFunc wiring HTTP -> service
  service/users.go     # business logic
  repository/users.go  # persistence
  domain/user.go       # core models
```

- **RESTful resource naming** (`/users`, `/orders/:id`); **version explicitly** (`/api/v1/...`).
- **Compose the router in `main`/an `app.NewRouter()` factory** — register routes with their handler + middleware visibly.
- **`Context.Context` flows through all layers** — create/derive one per request in middleware/handler, pass it to services and repositories.

---

## 3. Handlers & Middleware

- **Thin handlers** — parse, call the service, map the result; no business logic:

```go
func (h *UserHandler) Get(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil { c.JSON(http.StatusBadRequest, ErrResponse{"invalid id"}); return }
    user, err := h.svc.Get(c.Request.Context(), id)
    if err != nil { c.JSON(http.StatusNotFound, ErrResponse{err.Error()}); return }
    c.JSON(http.StatusOK, user)
}
```

- **`c.JSON`, `c.BindJSON`, `c.Param`, `c.Query`** are the Gin surface — everything else is plain Go.
- **Use interfaces at boundaries, not everywhere** — handlers depend on a `Service` interface; repositories accept `*sql.DB`.
- **No business logic in middleware** — middleware only does cross-cutting (logging, auth, CORS, request-id); services own all business decisions.

---

## 4. Middleware Patterns

- **Compose with `router.Use(mw)` for global, `group.Use(mw)` for route families**:

```go
api := r.Group("/api/v1")
api.Use(middleware.RequestID(), middleware.Auth(jwtVerifier))
api.POST("/users", h.Create)
```

- **Auth/request-id/logging in middleware, exposed via `c.Set`/`c.Get`** — typed helpers avoid stringly context:

```go
func Auth(verifier *jwt.Verifier) gin.HandlerFunc {
    return func(c *gin.Context) {
        token, err := extractBearer(c.GetHeader("Authorization"))
        if err != nil || verifier.Verify(token) != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, ErrResponse{"unauthorized"})
            return
        }
        c.Set("userID", verifier.Subject(token))
        c.Next()
    }
}
```

- **`c.Abort*` to stop the chain, `c.Next()` to continue** — middleware after `Next()` runs on the way out (logging timing).
- Keep middleware small and single-purpose; one concern, one function.

---

## 5. Validation

- **Bind typed structs with tags** and let Gin validate via `binding`:

```go
type CreateUserReq struct {
    Name  string `json:"name" binding:"required,min=1,max=200"`
    Email string `json:"email" binding:"required,email"`
}
if err := c.ShouldBindJSON(&req); err != nil { c.JSON(http.StatusBadRequest, ErrResponse{err.Error()}); return }
```

- **Validate all external input; fail fast on invalid requests** — never trust client data.
- **Validation at the handler edge, domain invariants in services** — handler validates shape, service validates rules.
- **Custom validators registered once** (`binding.Validator`) for app-specific rules; keep them colocated with their structs.

---

## 6. Error Handling

- **Go's explicit `if err != nil { return ... }` discipline** — no hidden panic recovery as primary flow; handlers return errors mapped to HTTP:

```go
if err := svc.Create(...); err != nil {
    c.JSON(statusFrom(err), ErrResponse{publicMessage(err)})
    return
}
```

- **Map domain errors to API-safe responses** — a small `statusFrom`/`toHTTP` mapping keeps HTTP out of services:

```go
func statusFrom(err error) int {
    switch err.(type) {
    case *domain.NotFoundError: return http.StatusNotFound
    case *domain.ValidationError: return http.StatusBadRequest
    default: return http.StatusInternalServerError
    }
}
```

- **Do not leak internal errors or stack traces** — log the cause, respond with the safe message.
- **`gin.Recovery()` catches panics** — but treat it as a safety net, not a substitute for explicit error returns.

---

## 7. Security

- **Authentication and authorization handled explicitly** — middleware verifies, services/policies authorize.
- **Avoid exposing internal IDs unintentionally** — external IDs/ULIDs where persistence IDs shouldn't leak.
- **Never trust client input**; escape/protect against injection at the persistence layer.
- **Secrets via environment, never code** — config loaded in `main`, injected where needed (no global mutable config).
- Map internal errors to generic responses; keep failure details in logs, not responses.

---

## 8. Reliability & Maintainability

- **Small, focused functions** (≤30 lines — the repo convention); explicit error returns; clear naming over cleverness.
- **Context-aware timeouts and cancellations** — `context.WithTimeout` in handlers/services for DB/HTTP calls.

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