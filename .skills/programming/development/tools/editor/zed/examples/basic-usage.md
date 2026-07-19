# Zed: Basic Usage

Best practices for the Zed editor — language servers and extensions, project settings in Zed, key bindings, collaboration, and formatting matching the repo. Use when configuring or working in Zed.

## Scenario

Use this example as a starting point when applying **zed-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Project Settings, Not User Settings** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
