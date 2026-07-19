# Overview

Focused reference for **travis-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Travis CI Best Practices

Travis CI is a CI/CD platform that integrates with GitHub. Best practice is to use build matrices for multiple configurations, implement caching for speed, use environment variables for configuration, follow Travis CI conventions, and optimize for performance and maintainability.

---

## 1. Core Concepts

- **Builds** — automated processes defined in `.travis.yml`
- **Stages** — logical divisions of a build
- **Jobs** — individual build tasks
- **Matrix** — multiple configurations in a single build
- **Caching** — speed up builds by caching dependencies

---

## 2. Configuration Structure

- **Basic Travis CI configuration:**

```yaml
language: node_js
node_js:
  - '18'
  - '20'

script:
  - npm ci
  - npm test
```

- **Use semantic versioning for Node.js.**
- **Use appropriate language for your project.**
- **Use script section for build commands.**

---

## 3. Build Matrix

- **Use build matrix for multiple configurations:**
