# CircleCI Best Practices: Basic Usage

Best practices for CircleCI configuration. Use when creating, structuring, or reviewing CircleCI pipelines for CI/CD workflows.

## Scenario

Use this example as a starting point when applying **circle-ci-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Project Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
version: 2.1

orbs:
  node: circleci/node@5
  python: circleci/python@3

jobs:
  build:
    docker:
      - image: circleci/node:20
    steps:
      - checkout
      - cache-restore:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}-{{ checksum "pnpm-lock.yaml" }}
            - v1-dependencies-
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test

  test:
    docker:
      - image: circleci/python:3.12
    steps:
      - checkout
      - cache-restore:
          keys:
            - v1-py-deps-{{ checksum "requirements.txt" }}
            - v1-py-deps-
      - run: pip install -r requirements.txt
      - run: pytest

workflows:
  version: 2
  build_and_test:
    jobs:
      - build
      - test
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
