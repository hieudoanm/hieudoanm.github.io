# pnpm Best Practices: Basic Usage

Best practices for the pnpm package manager — strict, disk-efficient, and deterministic dependency conventions for JavaScript. Use when writing, structuring, or reviewing pnpm — covers install, store, workspaces, overrides, and CI.

## Scenario

Use this example as a starting point when applying **pnpm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **4. Workspaces** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
packages:
  - packages/*
  - services/*
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
