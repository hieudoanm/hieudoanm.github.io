# JSR Best Practices: Basic Usage

Best practices for publishing and consuming JavaScript packages on JSR (jsr.io) — the modern JS/TS registry conventions. Use when writing, structuring, or reviewing JSR packages — covers scope/name, deno assert/browser interop, publish flow, and CI.

## Scenario

Use this example as a starting point when applying **jsr-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Package Metadata** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "name": "@myorg/lib",
  "version": "1.0.0",
  "exports": "./mod.ts",
  "publish": { "exclude": ["tests/", "dist/"] }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
