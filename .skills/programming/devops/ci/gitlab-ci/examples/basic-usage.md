# GitLab CI/CD Best Practices: Basic Usage

Best practices for GitLab CI/CD configuration. Use when creating, structuring, or reviewing GitLab pipeline definitions for CI/CD workflows.

## Scenario

Use this example as a starting point when applying **gitlab-ci-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Project Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
include:
  - project: "my-group/ci-templates"
    ref: main
    file: "/templates/docker-build.yml"
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
