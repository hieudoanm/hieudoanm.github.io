# Biome: Starter Template

A reusable starting point derived from the **2. Configuration** section of [Biome](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
