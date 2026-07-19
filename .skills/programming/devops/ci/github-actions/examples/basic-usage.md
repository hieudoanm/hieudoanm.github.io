# GitHub Actions Best Practices: Basic Usage

Best practices for using GitHub Actions for CI/CD. Use when creating, structuring, or reviewing GitHub Actions workflows — covers workflow design, job optimization, security, and deployment.

## Scenario

Use this example as a starting point when applying **github-actions-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Workflow Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
