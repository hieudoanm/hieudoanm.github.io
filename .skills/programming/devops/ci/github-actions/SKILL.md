---
name: github-actions-best-practices
description: Best practices for using GitHub Actions for CI/CD. Use when creating, structuring, or reviewing GitHub Actions workflows — covers workflow design, job optimization, security, and deployment.
---

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

- **Configure jobs with appropriate runners:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build
```

- **Use appropriate runners (ubuntu-latest, windows-latest, macos-latest).**
- **Set timeout limits to prevent runaway jobs.**
- **Use job dependencies with `needs`.**

---

## 5. Caching

- **Use caching for dependencies:**

```yaml
steps:
  - name: Cache node modules
    uses: actions/cache@v4
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-node-
```

- **Cache dependencies to speed up workflows.**
- **Use appropriate cache keys.**
- **Use restore-keys for cache fallbacks.**

---

## 6. Matrix Strategy

- **Use matrix for multiple configurations:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

- **Use matrix for testing across multiple configurations.**
- **Use exclude for specific combinations.**
- **Fail-fast to stop on first failure.**

---

## 7. Secrets Management

- **Use GitHub Secrets for sensitive data:**

```yaml
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
    run: |
      deploy.sh
```

- **Never hardcode secrets in workflows.**
- **Use environment secrets for configuration.**
- **Use org secrets for organization-wide secrets.**

---

## 8. Artifacts

- **Upload and download artifacts:**

```yaml
steps:
  - name: Build
    run: npm run build

  - name: Upload artifacts
    uses: actions/upload-artifact@v4
    with:
      name: build-artifacts
      path: dist/
```

- **Use artifacts to share files between jobs.**
- **Use retention days to manage artifact storage.**
- **Use artifact names for clarity.**

---

## 7. Deployment

- **Deploy to various platforms:**

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          # Deployment commands
```

- **Use conditional deployment (only on main branch).**
- **Use environment-specific workflows.**
- **Use deployment actions (Heroku, AWS, etc.).**

---

## 8. Docker

- **Build and push Docker images:**

```yaml
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: username/repo:latest
```

- **Use Docker Buildx for multi-platform builds.**
- **Use Docker Hub secrets for authentication.**
- **Use build-push-action for efficient builds.**

---

## 9. Reusable Workflows

- **Create reusable workflows:**

```yaml
# .github/workflows/reusable-workflow.yml
name: Reusable Workflow

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - name: Run tests
        run: npm test
```

- **Use reusable workflows for common tasks.**
- **Use inputs for configuration.**
- **Use outputs for sharing data.**

---

## 10. Security

- **Use security best practices:**

```yaml
steps:
  - name: Run security scan
    uses: actions/security-scan/action@v1
    with:
      severity: 'high,critical'
```

- **Use security scanning tools.**
- **Use code scanning for dependency vulnerabilities.**
- **Use security alerts for security notifications.**

---

## 11. General Rules of Thumb

- **Workflow design** — design workflows efficiently
- **Caching** — use caching for speed
- **Matrix strategy** — test across multiple configurations
- **Secrets** — use GitHub Secrets for sensitive data
- **Artifacts** — use artifacts for file sharing
- **Security** — implement security best practices
- **Documentation** — document workflows

---

## Quick-Start Checklist

- [ ] Appropriate workflow triggers configured
- [ ] Jobs configured with appropriate runners
- [ ] Caching configured for dependencies
- [ ] Matrix strategy for multiple configurations
- [ ] Secrets used for sensitive data
- [ ] Artifacts configured for file sharing
- [ ] Deployment configured appropriately
- [ ] Security scanning implemented
- [ ] Documentation complete
- [ ] Performance optimized
