# Echo Best Practices: Basic Usage

Best practices for building Go web services with Echo — the high-performance HTTP framework conventions. Use when writing, structuring, or reviewing Echo — covers routing, middleware, handlers, context, validation, errors, testing, and deployment.

## Scenario

Use this example as a starting point when applying **echo-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Route Grouping** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```go
func main() {
    e := echo.New()
    e.Use(middleware.Logger(), middleware.Recover())
    api := e.Group("/api", authMiddleware)
    api.GET("/users/:id", getUser)
    e.Start(":8080")
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
