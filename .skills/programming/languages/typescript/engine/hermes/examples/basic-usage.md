# Hermes Best Practices: Basic Usage

Best practices for running JavaScript on the Hermes engine — the Meta/React-Native JS engine conventions. Use when writing, structuring, or reviewing Hermes-targeted code — covers bytecode, GC, optimization limits, cold start, and RN integration.

## Scenario

Use this example as a starting point when applying **hermes-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Bytecode & Startup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
hermesc -emit-binary -out app.hbc app.js
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
