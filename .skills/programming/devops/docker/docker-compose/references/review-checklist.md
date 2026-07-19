# Review checklist

Focused reference for **docker-compose-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

## Web application stack

This Compose Specification example isolates the datastore, persists state, and waits for database health. Replace sample image tags with approved immutable digests for production. The secret file is local-only; do not commit it, and use the deployment platform's secret manager outside local development.

```yaml
services:
  app:
    image: myapp:1.2.3
    restart: unless-stopped
    ports: ["127.0.0.1:3000:3000"]
    environment:
      DATABASE_HOST: db
      DATABASE_NAME: app
      DATABASE_USER: app
      DATABASE_PASSWORD_FILE: /run/secrets/db_password
    secrets: [db_password]
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks: [app]

  db:
    image: postgres:16.4-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets: [db_password]
    volumes: [db_data:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \"$${POSTGRES_USER}\" -d \"$${POSTGRES_DB}\""]
      interval: 10s
      timeout: 5s
      retries: 5
    networks: [app]

  redis:
    image: redis:7.4.1-alpine
    command: ["redis-server", "--appendonly", "yes"]
    volumes: [redis_data:/data]
    networks: [app]

networks:
  app:
volumes:
  db_data:
  redis_data:
secrets:
  db_password:
    file: ./secrets/db_password.txt
```

Keep `./secrets/db_password.txt` out of version control, bind published ports only where intended, and verify the application supports the configured `*_FILE` setting.

## Development environment

Use a development override for source bind mounts, hot reload, debugging, and dev-only services. Keep production secrets and data out of the local stack, and bind exposed ports to loopback unless broader access is intentional.

```bash
docker compose -f compose.yaml -f compose.dev.yaml up --build
```


## Review checklist

For a multi-service deployment, verify that the application, datastore, cache, and edge proxy have explicit responsibilities, health checks, restart behavior, isolated networks, persistent volumes where needed, and environment-specific configuration. Keep secrets out of committed Compose files; load them through the deployment platform's secret mechanism.

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
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_NAME=app
REDIS_URL=redis://redis:6379
```

- **Documentation** — document Compose files:

```yaml
# docker-compose.yml
# This Compose file defines the production configuration for the application.
# It includes the app, database, redis, and nginx services.
#
# Usage:
#   docker compose -f compose.yaml -f compose.prod.yaml up -d
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
docker compose up -d --scale app=3

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
    image: myapp:1.2.3
    depends_on:
      - log-agent

  log-agent:
    image: log-agent:1.0.0
    volumes:
      - /var/log/app:/var/log
```

- **Init containers** — use init containers:

```yaml
services:
  app:
    image: myapp:1.2.3
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

- [ ] Current Compose Specification; avoid obsolete `version` keys unless tooling requires one
- [ ] Services organized by function
- [ ] Environment variables configured
- [ ] Networks configured properly
- [ ] Volumes for persistent data
- [ ] Health checks implemented
- [ ] Resource limits set
- [ ] Restart policies configured
- [ ] Development and production configs separated
- [ ] Documentation complete
