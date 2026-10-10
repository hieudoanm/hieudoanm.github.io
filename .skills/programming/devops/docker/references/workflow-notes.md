# Workflow notes

Focused reference for **docker-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```dockerfile
# Remove cache and temporary files
RUN npm ci && npm cache clean --force
RUN apt-get update && apt-get install -y package && rm -rf /var/lib/apt/lists/*
```

- **Use .dockerignore** — exclude unnecessary files:

```dockerfile
# .dockerignore
node_modules
npm-debug.log
.git
.env
.vscode
*.md
```

---

## 4. Security Best Practices

- **Use minimal base images** — prefer Alpine or distroless:

```dockerfile
# Good - Minimal
FROM node:18-alpine
FROM gcr.io/distroless/nodejs:18

# Avoid - Large base images
FROM node:18
FROM ubuntu:latest
```

- **Run as non-root user** — avoid running as root:

```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
```

- **Scan for vulnerabilities** — use security scanning tools:

```bash
# Trivy
trivy image myapp:latest

# Docker Scout
docker scout quickstart myapp:latest

# Snyk
snyk test --docker myapp:latest
```

- **Don't include secrets** — never include secrets in images:

```dockerfile
# Bad - Secrets in image
ENV API_KEY=secret123
COPY .env .

# Good - Use environment variables or secrets management
ENV API_KEY=${API_KEY}
```

---

## 5. Build Optimization

- **Build arguments** — use build arguments for flexibility:

```dockerfile
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}
```

- **Layer caching** — leverage layer caching:

```dockerfile
# Docker cache these layers if files haven't changed
COPY package*.json ./
RUN npm ci

# Only rebuild this if source changes
COPY . .
RUN npm run build
```

- **Parallel builds** — use BuildKit for parallel builds:

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Build with cache mount
docker build --cache-from=myapp:latest -t myapp:latest .
```

---

## 6. Runtime Best Practices

- **Resource limits** — set resource limits:
