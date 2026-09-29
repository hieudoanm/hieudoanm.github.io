---
name: docker-compose-best-practices
description: Best practices for using Docker Compose for multi-container applications. Use when creating, structuring, or reviewing docker-compose files — covers service orchestration, networking, volumes, and development workflows.
---

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

- **Version specification** — use appropriate Compose file version:

```yaml
version: '3.8'
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
    image: myapp:latest
```

- **Environment variables** — use environment variables:

```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
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
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379

  db:
    image: postgres:14-alpine

  redis:
    image: redis:7-alpine
```

- **Network isolation** — use separate networks:

```yaml
services:
  app:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

- **Custom networks** — configure custom networks:

```yaml
networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

---

## 5. Volume Management

- **Named volumes** — use named volumes for persistence:

```yaml
services:
  db:
    image: postgres:14-alpine
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

- **Bind mounts** — use bind mounts for development:

```yaml
services:
  app:
    volumes:
      - .:/app
      - /app/node_modules
```

- **Volume configuration** — configure volume options:

```yaml
services:
  app:
    volumes:
      - type: volume
        source: app-data
        target: /data
        volume:
          nocopy: true

volumes:
  app-data:
    driver: local
```

---

## 6. Dependencies

- **Service dependencies** — define service dependencies:

```yaml
services:
  app:
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    healthcheck:
      test: ['CMD', 'pg_isready', '-U', 'postgres']
      interval: 10s
      timeout: 5s
      retries: 5
```

- **Startup order** — control startup order:

```yaml
services:
  app:
    depends_on:
      - db
      - redis
    command: sh -c "wait-for db:5432 && npm start"
```

---

## 7. Resource Management

- **Resource limits** — set resource limits:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

- **Restart policies** — configure restart policies:

```yaml
services:
  app:
    restart: unless-stopped

  db:
    restart: always
```

---

## 8. Development vs Production

- **Use `profiles` to fence off optional services** — tag dev-only or on-demand services so a bare `docker compose up` starts only what production needs, and opt in explicitly when you want the rest:

```yaml
services:
  app:
    build: .
  mailhog:
    image: mailhog/mailhog # only starts under the "dev" profile
    profiles: ['dev']

# docker compose up              -> app only
# docker compose --profile dev up -> app + mailhog
```

Profiles keep optional infrastructure in the same file as production without polluting the default
bring-up, which is why they are usually better than a separate `docker-compose.override.yml` for
anything other than plain local mounts.

- **Development Compose** — optimize for development:

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
    command: npm run dev
```

- **Production Compose** — optimize for production:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    image: myapp:latest
    ports:
      - '80:3000'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    depends_on:
      - db
```

- **Override files** — use override files:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## 9. Health Checks

- **Health check configuration** — implement health checks:

```yaml
services:
  app:
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    healthcheck:
      test: ['CMD', 'pg_isready', '-U', 'postgres']
      interval: 10s
      timeout: 5s
      retries: 5
```

---

## 10. Logging

- **Log configuration** — configure logging:

```yaml
services:
  app:
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'
```

- **Centralized logging** — use logging drivers:

```yaml
services:
  app:
    logging:
      driver: 'syslog'
      options:
        syslog-address: 'tcp://192.168.0.42:123'
```

---

## 11. Secrets Management

- **Secrets file** — use secrets file:

```yaml
# docker-compose.yml
services:
  app:
    secrets:
      - db_password
      - api_key

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    file: ./secrets/api_key.txt
```

- **Environment variables** — use environment variables for secrets:

```yaml
services:
  app:
    environment:
      - DB_PASSWORD=${DB_PASSWORD}
      - API_KEY=${API_KEY}
```

---

## 12. Complete Examples

- **Web application stack** — complete web application:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    image: myapp:latest
    ports:
      - '80:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:${DB_PASSWORD}@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped
    networks:
      - frontend
      - backend
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=mydb
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ['CMD', 'pg_isready', '-U', 'user']
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    networks:
      - frontend
    restart: unless-stopped

networks:
  frontend:
  backend:

volumes:
  db-data:
  redis-data:
```

- **Development environment** — complete development setup:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    command: npm run dev
    depends_on:
      - db
      - redis

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    ports:
      - '5432:5432'
    volumes:
      - db-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data

  adminer:
    image: adminer
    ports:
      - '8080:8080'

networks:
  default:

volumes:
  db-data:
  redis-data:
```

---

## 13. Best Practices

- **File organization** — organize Compose files:

```text
.
├── docker-compose.yml           # Base configuration
├── docker-compose.dev.yml       # Development overrides
├── docker-compose.prod.yml      # Production overrides
├── .env                        # Environment variables
├── .env.example                # Example environment file
└── .env.production             # Production environment file
```

- **Environment files** — use environment files:

```bash
# .env.example
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:pass@db:5432/mydb
REDIS_URL=redis://redis:6379
```

- **Documentation** — document Compose files:

```yaml
# docker-compose.yml
# This Compose file defines the production configuration for the application.
# It includes the app, database, redis, and nginx services.
#
# Usage:
#   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
#
# Services:
#   app: Main application
#   db: PostgreSQL database
#   redis: Redis cache
#   nginx: Reverse proxy
```

---

## 14. Common Patterns

- **Service scaling** — scale services:

```bash
# Scale a service
docker-compose up -d --scale app=3

# Define in Compose file
services:
  app:
    deploy:
      replicas: 3
```

- **Sidecar containers** — use sidecar containers:

```yaml
services:
  app:
    image: myapp:latest
    depends_on:
      - log-agent

  log-agent:
    image: log-agent:latest
    volumes:
      - /var/log/app:/var/log
```

- **Init containers** — use init containers:

```yaml
services:
  app:
    image: myapp:latest
    depends_on:
      - init

  init:
    image: busybox
    command: sh -c "until nc -z db 5432; do sleep 1; done"
```

---

## 15. General Rules of Thumb

- **Service organization** — organize services by function
- **Environment separation** — separate dev and production configs
- **Volume management** — use volumes for persistent data
- **Networking** — use proper network isolation
- **Health checks** — implement health checks
- **Resource limits** — set resource limits
- **Documentation** — document Compose files
- **Version control** — commit Compose files

---

## Quick-Start Checklist

- [ ] Appropriate Compose file version
- [ ] Services organized by function
- [ ] Environment variables configured
- [ ] Networks configured properly
- [ ] Volumes for persistent data
- [ ] Health checks implemented
- [ ] Resource limits set
- [ ] Restart policies configured
- [ ] Development and production configs separated
- [ ] Documentation complete
