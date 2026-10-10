# Travis CI Best Practices: Basic Usage

Best practices for using Travis CI for CI/CD. Use when creating, structuring, or reviewing Travis CI configurations — covers build matrix, caching, deployment, and optimization.

## Scenario

Use this example as a starting point when applying **travis-ci-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Configuration Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
language: node_js
node_js:
  - '18'
  - '20'

script:
  - npm ci
  - npm test
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
