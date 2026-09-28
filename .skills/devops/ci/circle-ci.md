---
name: circle-ci-best-practices
description: Best practices for CircleCI configuration. Use when creating, structuring, or reviewing CircleCI pipelines for CI/CD workflows.
---

# CircleCI Best Practices

CircleCI is a continuous integration and delivery platform that uses YAML configuration files (`config.yml`) to define pipelines. Following conventions makes pipelines readable, maintainable, and portable.

---

## 1. Project Structure

Keep `config.yml` organized and version-controlled alongside your code. Store sensitive data in CircleCI's UI environment variables rather than committing them to version control.

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