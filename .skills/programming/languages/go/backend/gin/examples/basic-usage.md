# Gin Backend Best Practices: Basic Usage

Best practices for building HTTP APIs with Gin (Go). Use when creating, structuring, or reviewing a Gin app — covers routing, middleware, context, validation, error handling, and testing.

## Scenario

Use this example as a starting point when applying **gin-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Handlers & Middleware** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```go
func (h *UserHandler) Get(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil { c.JSON(http.StatusBadRequest, ErrResponse{"invalid id"}); return }
    user, err := h.svc.Get(c.Request.Context(), id)
    if err != nil { c.JSON(http.StatusNotFound, ErrResponse{err.Error()}); return }
    c.JSON(http.StatusOK, user)
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
