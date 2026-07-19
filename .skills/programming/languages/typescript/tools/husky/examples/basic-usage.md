# Husky: Basic Usage

Best practices for Git hooks with Husky — v9 setup, hook script format, lint-staged and commitlint integration, CI parity, and when to use lefthook instead. Use when adding or debugging pre-commit hooks in a JS/TS repo.

## Scenario

Use this example as a starting point when applying **husky-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "husky": "9.1.7"
  }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
