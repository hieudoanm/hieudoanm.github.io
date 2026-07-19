# Overview

Focused reference for **docker-compose-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

# Docker Compose Best Practices

Docker Compose is a tool for defining and running multi-container Docker applications. Best practice is to organize services logically, implement proper networking and volume management, use environment variables for configuration, and follow Compose best practices for development and production.

---

## 1. Core Principles

- **Service organization** — organize services by function
- **Environment separation** — separate dev, staging, and production configurations
- **Networking** — use proper network isolation and service discovery
- **Volume management** — use volumes for persistent data
- **Configuration** — use environment variables and configuration files

---

## 2. Compose File Structure

- **Compose Specification** — with Compose V2, omit the obsolete top-level `version` field:

```yaml
# Compose V2 uses the current Compose Specification; no version field is needed.
```

- **Service definition** — define services clearly:

```yaml
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis
```

- **Networks and volumes** — define networks and volumes:

```yaml
services:
  app:
    networks:
      - frontend
      - backend

networks:
  frontend:
  backend:

volumes:
  db-data:
```

---

## 3. Service Configuration

- **Build configuration** — configure build options:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
      args:
        NODE_VERSION: 18
    image: myapp:1.2.3
```

- **Environment variables** — use environment variables:

```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_HOST=db
      - DATABASE_PORT=5432
      - DATABASE_NAME=app
    env_file:
      - .env
      - .env.production
```

- **Ports** — expose ports appropriately:

```yaml
services:
  app:
    ports:
      - '3000:3000' # host:container
      - '8080' # random host port
    expose:
      - '3000' # internal port only
```

---

## 4. Networking

- **Service discovery** — use service names for discovery:

```yaml
services:
  app:
    environment:
      - DATABASE_HOST=db
      - DATABASE_PORT=5432
      - DATABASE_NAME=app
      - REDIS_URL=redis://redis:6379

  db:
    image: postgres:16.4-alpine

  redis:
    image: redis:7.4.1-alpine
```

- **Network isolation** — use separate networks:
