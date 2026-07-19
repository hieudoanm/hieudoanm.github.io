# Gin Backend Best Practices: Starter Template

A reusable starting point derived from the **4. Middleware Patterns** section of [Gin Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
