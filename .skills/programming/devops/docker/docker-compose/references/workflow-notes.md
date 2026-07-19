# Workflow notes

Focused reference for **docker-compose-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
