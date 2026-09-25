---
name: travis-ci-best-practices
description: Best practices for using Travis CI for CI/CD. Use when creating, structuring, or reviewing Travis CI configurations — covers build matrix, caching, deployment, and optimization.
---

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

## 6. Environment Variables

- **Use environment variables:**

```yaml
env:
  global:
    - NODE_ENV=test
    - API_KEY=encrypted_key
```

- **Use environment variables for configuration.**
- **Use encrypted environment variables for secrets.**
- **Use build-specific variables.**

---

## 7. Deployment

- **Deploy to various platforms:**

```yaml
deploy:
  provider: heroku
  api_key:
    secure: encrypted_api_key
  app: myapp
  on:
    branch: main
```

- **Use appropriate deployment providers.**
- **Use conditional deployment on specific branches.**
- **Use encrypted credentials for authentication.**

---

## 8. Docker

- **Use Docker in builds:**

```yaml
services:
  - docker

before_install:
  - docker pull postgres:latest

script:
  - docker build -t myapp .
  - docker run myapp npm test
```

- **Use Docker for containerized builds.**
- **Use services for additional containers.**
- **Use Docker Compose for multi-container apps.**

---

## 9. Notifications

- **Configure build notifications:**

```yaml
notifications:
  email:
    recipients:
      - build@example.com
    on_success: change
    on_failure: always
```

- **Use notifications for build status updates.**
- **Use appropriate notification channels.**
- **Configure notification triggers appropriately.**

---

## 10. General Rules of Thumb

- **Build matrix** — test across multiple configurations
- **Caching** — use caching for speed
- **Stages** — use stages for organization
- **Security** — use encrypted secrets
- **Notifications** — configure notifications
- **Documentation** — document builds

---

## Quick-Start Checklist

- [ ] Appropriate language configured
- [ ] Build matrix configured
- [ ] Caching configured
- [ ] Stages configured
- [ ] Environment variables set
- [ ] Secrets encrypted
- [ ] Deployment configured
- [ ] Notifications configured
- [ ] Documentation complete
- [ ] Performance optimized
