# JSR Best Practices: Starter Template

A reusable starting point derived from the **1. Package Metadata** section of [JSR Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```json
{
  "name": "@myorg/lib",
  "version": "1.0.0",
  "exports": "./mod.ts",
  "publish": { "exclude": ["tests/", "dist/"] }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
