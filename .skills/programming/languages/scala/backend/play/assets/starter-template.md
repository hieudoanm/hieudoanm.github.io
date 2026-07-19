# Play Framework Backend Best Practices: Starter Template

A reusable starting point derived from the **7. Configuration & Portability** section of [Play Framework Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```hocon
db.default.url = ${?DB_URL}
auth.jwt.secret = ${?JWT_SECRET}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
