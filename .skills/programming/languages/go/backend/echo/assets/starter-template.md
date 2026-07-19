# Echo Best Practices: Starter Template

A reusable starting point derived from the **2. Middleware** section of [Echo Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
