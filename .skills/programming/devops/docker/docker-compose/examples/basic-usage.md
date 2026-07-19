# Docker Compose Best Practices: Basic Usage

Best practices for using Docker Compose for multi-container applications. Use when creating, structuring, or reviewing docker-compose files — covers service orchestration, networking, volumes, and development workflows.

## Scenario

Use this example as a starting point when applying **docker-compose-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Compose File Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
