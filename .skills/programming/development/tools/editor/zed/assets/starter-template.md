# Zed: Starter Template

A reusable starting point derived from the **1. Project Settings, Not User Settings** section of [Zed](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```json
{
  "$schema": "https://zed.dev/schema/settings.json",
  "formatter": { "language_server": { "typescript": "prettier" } },
  "linter": { "format_on_save": true, "eslint": { "with_ignore_path": true } },
  "languages": {
    "TypeScript": {
      "tab_size": 2,
      "typescript": { "tsdk": "node_modules/typescript/lib" }
    }
  },
  "file_types": { "JSONC": "jsonc" }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
