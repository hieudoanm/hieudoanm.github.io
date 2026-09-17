# Implementation notes

Focused reference for **github-actions-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
