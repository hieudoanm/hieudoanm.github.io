# Biome: Basic Usage

Best practices for using Biome as a unified linter, formatter, and import organizer — configuration, type-aware rules, safe fixes, migrations, and where Biome still falls short of ESLint and Prettier.

## Scenario

Use this example as a starting point when applying **biome-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```jsonc
// biome.json
{
  "$schema": "https://biomejs.dev/schemas/2.5.14/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "ignoreUnknown": true },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
  },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "asNeeded" },
  },
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "assist": {
    "enabled": true,
    "actions": { "source": { "organizeImports": "on" } },
  },
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
