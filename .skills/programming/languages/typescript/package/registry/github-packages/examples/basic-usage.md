# GitHub Packages Best Practices: Basic Usage

Best practices for hosting and consuming JavaScript packages on GitHub Packages — the GHCR/GPR conventions for npm scope publishing. Use when writing, structuring, or reviewing GitHub Packages — covers auth, scoping, publishing, private packages, and CI workflows.

## Scenario

Use this example as a starting point when applying **github-packages-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Auth & Registry** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
permissions:
  contents: read
  packages: write
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
