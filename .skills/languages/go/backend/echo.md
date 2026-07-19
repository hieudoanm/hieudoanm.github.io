---
name: echo-best-practices
description: Best practices for building Go web services with Echo — the high-performance HTTP framework conventions. Use when writing, structuring, or reviewing Echo — covers routing, middleware, handlers, context, validation, errors, testing, and deployment.
---

# Echo Best Practices

Echo is a high-performance Go web framework with a rich ecosystem of middleware and an elegant **handler signature** `func(c echo.Context) error` that centralizes request/response handling. Practical Echo leans on **route groups with layered middleware, one handler per request concern, a `Context`-owned request boundary that flows cancellation downstream**, and **errors returned, not thrown, with a uniform error handler**.

---

## 1. Route Grouping

- **`echo.New()` at the entry; `Group` for middleware scope:**

```go
func main() {
    e := echo.New()
    e.Use(middleware.Logger(), middleware.Recover())
    api := e.Group("/api", authMiddleware)
    api.GET("/users/:id", getUser)
    e.Start(":8080")
}
```

- **Subroutes per domain** (`r.Group("/users", ...)` or `router.GET`); the path contract visible at the route definition.
- **`e.GET`/`e.POST`/`e.DELETE` at the top level; `Group` only where middleware scoping matters.**
- **`e.HTTPErrorHandler` set once** — global error-to-response mapping, not per-handler `c.JSON` calls.

---

## 2. Middleware

- **Middleware is a function wrapping the handler; order matters** (Logger → Recoverer → CORS → Auth → business):

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

- **Echo's built-in middleware** (`Logger`, `Recover`, `Gzip`, `CORS`) are the defaults; custom ones follow the same signature.
- **Auth middleware on the protected group** — never per-route; the group is the security domain.
- **Middleware returns error** — an auth failure can `return echo.ErrUnauthorized` instead of swallowing the failure silently.
- **Request-id before logging/auth** — spans carry the identity; the logger writes the ID out.

---

## 3. Handlers

- **Handler returns `error`** — the framework renders it; the handler owns the domain:

```go
func getUser(c echo.Context) error {
    id, err := strconv.ParseInt(c.Param("id"), 10, 64)
    if err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, "invalid id")
    }
    user, err := svc.Find(id)
    if err != nil {
        return err   // mapped by HTTPErrorHandler
    }
    return c.JSON(http.StatusOK, user)
}
```

- **One concern per handler** — parse, validate, call service, return.
- **No business logic in handlers** — handlers are HTTP adapters, not domain containers.
- **Error returned; no `c.JSON(err)` in every handler** — the global error handler maps error → JSON shape.
- **Validation at the boundary before any service call** — use Echo's validator or `go-playground/validator` via struct tags.

---

## 4. Context & Binding

- **`c.Bind(&input)` for request binding/validation** — JSON, query, form, multipart; the framework does the work:

```go
var req CreateUserRequest
if err := c.Bind(&req); err != nil {
    return err
}
```

- **`c.Set`/`c.Get` for request-scoped values (request-id, user-id)** — keep it minimal; don't store entire services in context.
- **Context cancellation flows downstream** (`c.Request().Context()`) to DB/HTTP calls; the handler owns the deadline.
- **`echo.Map` for ad-hoc JSON**; typed structs for all API boundaries.

---

## 5. Error Handling

- **Return errors from handlers; the global `HTTPErrorHandler` shapes them:**

```go
func customErrorHandler(err error, c echo.Context) {
    if he, ok := err.(*echo.HTTPError); ok {
        c.JSON(he.Code, map[string]string{"error": he.Message.(string)})
    } else {
        c.JSON(http.StatusInternalServerError, map[string]string{"error": "internal"})
    }
}
```

- **Domain errors converted to `echo.HTTPError` at the repo/service boundary** — a named mapping function over error type.
- **No panics as control flow** — `Recoverer` catches them, but the contract says "return error".
- **Safe messages out** — internal detail to logs; a generic shape to the client.

---

## 6. Testing

- **Handler tests via `httptest` + the full router** — a real HTTP request, not a fake:

```go
func Test_getUser(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/api/users/1", nil)
    rec := httptest.NewRecorder()
    e.ServeHTTP(rec, req)
    assert.Equal(t, http.StatusOK, rec.Code)
}
```

- **Fakes at the service/repo boundary** — the handler test owns the HTTP layer; service test owns domain logic.
- **Integration tests via `httptest.NewServer`** for real network round-trips.
- **Contract cases**: valid, invalid, not-found, unauthorized, method-not-allowed.

---

## General Rules of Thumb

- **Route groups scope middleware; middleware order is the request-processing pipeline.**
- **Handler returns `error`; the global error handler maps domain → HTTP response.**
- **Validate at the boundary; bind via `c.Bind`; context carries the request down.**
- **Handlers are thin adapters; business logic lives in services.**
- **Tests via `httptest` + full router; contract covered.**

---

## Quick-Start Checklist

- [ ] `Group` per domain; middleware ordered (Logger → Recover → CORS → Auth)
- [ ] Handler returns `error`; `echo.HTTPError` for boundary conversions
- [ ] `c.Bind` at entry; validation before any mutation; `c.Request().Context()` down
- [ ] Domain errors converted to `HTTPError` in a shared mapper
- [ ] `echo.HTTPErrorHandler` set once; JSON error response shape uniform
- [ ] No panic-as-control-flow; `Recoverer` for the unexpected
- [ ] `httptest` handler tests + contract; service/repo fakes in unit tests