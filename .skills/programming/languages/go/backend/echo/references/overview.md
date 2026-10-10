# Overview

Focused reference for **echo-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
