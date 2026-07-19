# GitHub Packages Best Practices: Starter Template

A reusable starting point derived from the **2. Package Setup** section of [GitHub Packages Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```json
{
  "name": "@myorg/analytics",
  "version": "1.2.3",
  "publishConfig": { "access": "restricted", "registry": "https://npm.pkg.github.com" },
  "files": ["dist/"]
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
