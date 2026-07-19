# styled-components: Basic Usage

styled-components — CSS-in-JS for React with tagged template literals, theme support, and automatic critical CSS extraction.

## Scenario

Use this example as a starting point when applying **styled-components** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
