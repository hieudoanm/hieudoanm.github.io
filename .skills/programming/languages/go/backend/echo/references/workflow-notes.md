# Workflow notes

Focused reference for **echo-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
