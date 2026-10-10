# CI/CD Harness Best Practices: Basic Usage

Best practices for CI/CD harness configuration. Use when designing shared CI pipelines, orchestration, or multi-stage workflows across projects.

## Scenario

Use this example as a starting point when applying **ci-harness-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Harness Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
# Example harness job template
parameters:
  job-name:
    type: string
  image:
    type: string
    default: "circleci/node:20"
  steps-list:
    type: string  # inline YAML or reference

jobs:
  build-test-deploy:
    docker:
      - image: <<parameters.image>>
    steps:
      - <<parameters.steps-list>>
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
