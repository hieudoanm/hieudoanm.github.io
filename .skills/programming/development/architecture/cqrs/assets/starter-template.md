# CQRS Best Practices: Starter Template

A reusable starting point derived from the **4. Query Implementation** section of [CQRS Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
interface Query {
  type: string
  parameters: any
}

class GetUserQuery implements Query {
  type = 'GetUser'
  parameters: {
    userId: string
  }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
