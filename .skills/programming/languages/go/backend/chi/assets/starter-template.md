# Chi Best Practices: Starter Template

A reusable starting point derived from the **1. Router & Route Composition** section of [Chi Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
