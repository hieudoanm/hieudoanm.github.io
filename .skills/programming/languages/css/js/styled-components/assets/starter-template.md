# Styled Components: Starter Template

A reusable starting point derived from the **1. Setup** section of [Styled Components](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```json
// babel.config.json — displayName gives readable class names, ssr enables sheet reuse
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      { "displayName": true, "fileName": false, "pure": true, "ssr": true }
    ]
  ]
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
