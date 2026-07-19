# CI/CD Harness Best Practices: Starter Template

A reusable starting point derived from the **1. Harness Structure** section of [CI/CD Harness Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
