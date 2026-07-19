# Implementation notes

Focused reference for **travis-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
