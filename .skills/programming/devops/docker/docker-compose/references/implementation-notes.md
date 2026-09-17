# Implementation notes

Focused reference for **docker-compose-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
# Compose V2 uses the current Compose Specification; no version field is needed.

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
# Compose V2 uses the current Compose Specification; no version field is needed.

services:
  app:
    image: myapp:1.2.3
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
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
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

- **Secret injection** — use Compose secrets or the deployment platform's secret manager. Avoid putting credentials in committed files or environment variables when the application can read mounted secret files:

```yaml
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

---

## 12. Complete Examples
