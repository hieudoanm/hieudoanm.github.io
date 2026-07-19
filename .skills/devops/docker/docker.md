---
name: docker-best-practices
description: Best practices for using Docker for containerization. Use when creating, structuring, or reviewing Dockerfiles and Docker configurations — covers image optimization, security, multi-stage builds, and container orchestration.
---

# Docker Best Practices

Docker is a platform for developing, shipping, and running applications in containers. Best practice is to create optimized images, implement security measures, use multi-stage builds, and follow Docker best practices for maintainability and performance.

---

## 1. Core Principles

- **Small images** — keep images small for faster builds and deployments
- **Layer caching** — leverage Docker's layer caching for faster builds
- **Security** — scan images for vulnerabilities and use minimal base images
- **Reproducibility** — use specific tags and build arguments for reproducible builds
- **Efficiency** — optimize for build time, image size, and runtime performance

---

## 2. Dockerfile Structure

- **Base image selection** — use minimal, official base images:

```dockerfile
# Good - Minimal and specific
FROM node:18-alpine AS base

# Avoid - Latest tag
FROM node:latest

# Avoid - Large base images
FROM node:18
```

- **Multi-stage builds** — use multi-stage builds for smaller images:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

- **Pin base image digests** for reproducible, auditable builds — a mutable tag (`node:18-alpine`) can point at new content under you, and `latest` can move under a running build:

```dockerfile
# Good - tag for readability, digest for reproducibility
FROM node:18-alpine@sha256:3f4b1b2c8e9a... AS base
```

- **`LABEL` images for provenance** — tie an image back to its source so a running container can be traced to a commit:

```dockerfile
LABEL org.opencontainers.image.source="https://github.com/hieudoanm/hieudoanm.github.io" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.licenses="MIT"
```

- **`COPY --chown=` instead of a chmod `RUN`** — ownership is metadata on the copy, so it adds no extra layer the way a `RUN chown` does:

```dockerfile
COPY --chown=app:app ./dist ./dist      # Good - no extra layer
RUN chown -R app:app ./dist             # Avoid - creates a whole extra layer
```

- **Layer ordering** — order instructions to maximize caching:

```dockerfile
# Good - Changes rarely
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Changes frequently
COPY . .
RUN npm run build
```

---

## 3. Image Optimization

- **Minimize layers** — combine related instructions:

```dockerfile
# Bad - Multiple layers
RUN apk add --no-cache git
RUN apk add --no-cache curl
RUN apk add --no-cache vim

# Good - Single layer
RUN apk add --no-cache git curl vim
```

- **Remove unnecessary files** — clean up after installations:

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

```yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

- **Health checks** — implement health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

- **Signal handling** — handle signals properly:

```dockerfile
# Use exec form for signal handling
CMD ["node", "server.js"]

# Not exec form - signals won't reach process
CMD node server.js
```

---

## 7. Configuration Management

- **Environment variables** — use environment variables:

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

- **Entry point scripts** — use entry point scripts:

```dockerfile
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
```

```bash
#!/bin/sh
set -e

# Run any startup scripts
if [ -d /docker-entrypoint-initdb.d ]; then
  for f in /docker-entrypoint-initdb.d/*; do
    case "$f" in
      *.sh) echo "$0: running $f"; . "$f" ;;
      *) echo "$0: ignoring $f" ;;
    esac
  done
fi

exec "$@"
```

---

## 8. Multi-Platform Builds

- **Buildx for multi-platform** — use BuildKit for multi-platform builds:

```bash
# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest .

# Create and use builder
docker buildx create --name mybuilder --use
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest .
```

- **Cross-compilation** — handle cross-compilation:

```dockerfile
# Use cross-compilation tools
FROM --platform=$BUILDPLATFORM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM --platform=$TARGETPLATFORM node:18-alpine
COPY --from=builder /app/dist ./dist
```

---

## 9. Development vs Production

- **Development Dockerfile** — optimize for development:

```dockerfile
# Dockerfile.dev
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

- **Production Dockerfile** — optimize for production:

```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

---

## 10. Testing

- **Container testing** — test containers:

```bash
# Run tests in container
docker run --rm myapp:latest npm test

# Interactive container for debugging
docker run -it --rm myapp:latest sh
```

- **Integration testing** — test with Docker Compose:

```yaml
# docker-compose.test.yml
version: '3.8'
services:
  app:
    build: .
    command: npm test
    depends_on:
      - db
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: test
```

---

## 11. Monitoring and Logging

- **Structured logging** — use structured logging:

```dockerfile
# Use JSON logging
ENV NODE_ENV=production
ENV LOG_FORMAT=json
```

- **Log aggregation** — configure log drivers:

```yaml
# docker-compose.yml
services:
  app:
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'
```

---

## 12. Dockerfile Examples

- **Node.js application** — complete Node.js Dockerfile:

```dockerfile
# Multi-stage build for Node.js
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/server.js"]
```

- **Python application** — complete Python Dockerfile:

```dockerfile
# Multi-stage build for Python
FROM python:3.11-slim AS builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Production stage
FROM python:3.11-slim AS production

WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder --chown=appuser:appuser /app .

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start application
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]
```

---

## 13. General Rules of Thumb

- **Small images** — use minimal base images and multi-stage builds
- **Layer caching** — order instructions to maximize caching
- **Security** — run as non-root, scan for vulnerabilities
- **Specific tags** — use specific version tags, not latest
- **No secrets** — never include secrets in images
- **Health checks** — implement health checks
- **Resource limits** — set resource limits
- **Documentation** — document Dockerfiles and usage

---

## Quick-Start Checklist

- [ ] Minimal base image (Alpine/distroless)
- [ ] Multi-stage build implemented
- [ ] Non-root user configured
- [ ] Layer caching optimized
- [ ] .dockerignore configured
- [ ] Health check implemented
- [ ] Security scanning configured
- [ ] Build arguments for flexibility
- [ ] Resource limits set
- [ ] Documentation complete
