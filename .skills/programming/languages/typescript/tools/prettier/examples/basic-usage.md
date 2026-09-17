# Prettier: Basic Usage

Best practices for formatting JavaScript and TypeScript with Prettier — configuration, intentional non-formatting, plugin selection, ESLint integration, and CI enforcement. Use when setting up, structuring, or debugging a Prettier setup.

## Scenario

Use this example as a starting point when applying **prettier-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
// .prettierrc.json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "arrowParens": "always",
  "quoteProps": "as-needed",
  "objectWrap": "preserve",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
