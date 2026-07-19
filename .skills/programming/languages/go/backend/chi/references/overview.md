# Overview

Focused reference for **chi-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Chi Best Practices

Chi is a lightweight Go router that composes like `net/http` — **route groups (`chi.NewRouter`) with middleware, handlers returning `http.Handler`, and `chi.URLParam` for parameter extraction**. Practical Chi leans on **small, composable middleware, handlers that own one request concern, context-carried request IDs and scoped values**, and **errors as values (not panics) flowing to a uniform error handler**.

---

## 1. Router & Route Composition

- **`chi.NewRouter()` at the entry; subrouters per domain group:**

```go
func apiRouter() chi.Router {
    r := chi.NewRouter()
    r.Use(middleware.Logger, middleware.Recoverer)
    r.Route("/users", func(r chi.Router) {
        r.Get("/", listUsers)
        r.Post("/", createUser)
        r.Get("/{id}", getUser)
    })
    return r
}
```

- **`r.Group` for middleware-scoped subsets**; `r.Mount` for sub-apps mounted at a prefix.
- **Route patterns named at the `Route`/`Get`/`Post` level** — the path is visible in one place, not across scattered params.
- **Method-not-allowed handled automatically** (`chi.Router` sets `405` on known routes with the wrong verb).
- **`chi.URLParam(r, "id")` at the handler boundary** — the URL contract is the type boundary; parse + validate early:

```go
id, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
```

- **`r.NotFound`/`r.MethodNotAllowed` for custom fallback handlers** — 404/405 shaped consistently.

---
