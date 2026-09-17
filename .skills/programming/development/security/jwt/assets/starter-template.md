# JWT Best Practices: Starter Template

A reusable starting point derived from the **8. Implementation Examples** section of [JWT Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
function authorizeRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles || !req.user.roles.includes(role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
