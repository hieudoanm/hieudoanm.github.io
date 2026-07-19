# Docker Compose Best Practices: Starter Template

A reusable starting point derived from the **3. Service Configuration** section of [Docker Compose Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
