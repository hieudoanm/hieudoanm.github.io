# Overview

Focused reference for **docker-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
