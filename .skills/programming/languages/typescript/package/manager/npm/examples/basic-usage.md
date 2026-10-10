# npm Best Practices: Basic Usage

Best practices for the npm package manager and registry — dependency management conventions for JavaScript. Use when writing, structuring, or reviewing npm usage — covers package.json, lockfiles, scripts, publishing, scoping, and security.

## Scenario

Use this example as a starting point when applying **npm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. package.json** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "name": "my-tool",
  "version": "1.0.0",
  "type": "module",
  "engines": { "node": ">=20" },
  "exports": { ".": "./dist/index.js" }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
