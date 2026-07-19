# Review checklist

Focused reference for **circle-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
