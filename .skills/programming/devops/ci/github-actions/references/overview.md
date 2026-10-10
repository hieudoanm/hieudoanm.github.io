# Overview

Focused reference for **github-actions-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# GitHub Actions Best Practices

GitHub Actions is a CI/CD platform integrated with GitHub. Best practice is to design workflows efficiently, use caching for speed, implement proper security, follow GitHub Actions conventions, and optimize for performance and maintainability.

---

## 1. Core Concepts

- **Workflows** — automated processes defined in YAML
- **Jobs** — sets of steps that run on the same runner
- **Steps** — individual tasks within a job
- **Runners** — servers that run your jobs
- **Actions** — reusable custom applications

---

## 2. Workflow Structure

- **Basic workflow structure:**

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

- **Use semantic naming for workflows, jobs, and steps.**
- **Trigger workflows on appropriate events.**
- **Use matrix strategy for multiple configurations.**

---

## 3. Workflow Triggers

- **Configure workflow triggers:**

```yaml
on:
  push:
    branches: [main, develop]
    tags:
      - 'v*'
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]
  schedule:
    - cron: '0 0 * * 0'
    - workflow_dispatch:
```

- **Use appropriate triggers for your workflow.**
- **Avoid excessive triggers to save resources.**
- **Use workflow_dispatch for manual triggers.**

---

## 4. Job Configuration
