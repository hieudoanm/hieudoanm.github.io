# Workflow notes

Focused reference for **travis-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```yaml
language: node_js
node_js:
  - '16'
  - '18'
  - '20'

os:
  - linux
  - windows
  - osx

arch:
  - amd64
  - arm64
```

- **Use matrix for testing across multiple configurations.**
- **Use exclude for specific combinations.**
- **Use fast_finish to stop on first failure.**

---

## 4. Caching

- **Use caching for dependencies:**

```yaml
cache:
  directories:
    - node_modules
    - $HOME/.npm
```

- **Cache node_modules to speed up builds.**
- **Use npm cache for package dependencies.**
- **Use appropriate cache directories.**

---

## 5. Stages

- **Use stages for logical build organization:**

```yaml
stages:
  - test
  - build
  - deploy

jobs:
  include:
    - stage: test
      script: npm test
    - stage: build
      script: npm run build
    - stage: deploy
      script: npm run deploy
```

- **Use stages to organize build phases.**
- **Use job dependencies for sequential execution.**
- **Use parallel execution within stages.**

---
