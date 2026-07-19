# npm Best Practices: Starter Template

A reusable starting point derived from the **1. package.json** section of [npm Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```json
{
  "name": "my-tool",
  "version": "1.0.0",
  "type": "module",
  "engines": { "node": ">=20" },
  "exports": { ".": "./dist/index.js" }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
