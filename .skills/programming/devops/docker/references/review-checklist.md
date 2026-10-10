# Review checklist

Focused reference for **docker-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
# Compose V2 uses the current Compose Specification; no version field is needed.
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
