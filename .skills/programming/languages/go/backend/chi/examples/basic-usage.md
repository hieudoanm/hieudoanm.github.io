# Chi Best Practices: Basic Usage

Best practices for building Go web services with Chi — the lightweight, composable HTTP router conventions. Use when writing, structuring, or reviewing Chi services — covers routing, middleware, handlers, context, validation, errors, testing, and deployment.

## Scenario

Use this example as a starting point when applying **chi-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Router & Route Composition** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
