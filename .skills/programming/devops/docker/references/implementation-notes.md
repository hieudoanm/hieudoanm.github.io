# Implementation notes

Focused reference for **docker-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```yaml
# docker-compose.yml
services:
  app:
    image: myapp:1.2.3
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
