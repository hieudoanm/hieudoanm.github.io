# CircleCI Best Practices: Starter Template

A reusable starting point derived from the **1. Project Structure** section of [CircleCI Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
