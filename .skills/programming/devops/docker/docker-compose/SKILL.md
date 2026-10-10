---
name: "docker-compose-best-practices"
description: "Best practices for using Docker Compose for multi-container applications. Use when creating, structuring, or reviewing docker-compose files — covers service orchestration, networking, volumes, and development workflows."
tags:
  - "programming"
  - "devops"
  - "docker"
  - "compose"
when_to_use: "Use when creating, structuring, or reviewing docker-compose files."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../SKILL.md"
  - "../../kubernetes/SKILL.md"
  - "../../ci/github-actions/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Docker Compose Best Practices

Docker Compose is a tool for defining and running multi-container Docker applications. Best practice is to organize services logically, implement proper networking and volume management, use environment variables for configuration, and follow Compose best practices for development and production.

## When to use

Use when creating, structuring, or reviewing docker-compose files.

## Prerequisites

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Service organization** — organize services by function
- **Environment separation** — separate dev, staging, and production configurations
- **Networking** — use proper network isolation and service discovery
- **Volume management** — use volumes for persistent data
- **Configuration** — use environment variables and configuration files
- **Environment separation** — separate dev and production configs
- **Networking** — use proper network isolation
- **Health checks** — implement health checks

## Focus areas

- 1. Core Principles
- 2. Compose File Structure
- 3. Service Configuration
- 4. Networking
- 5. Volume Management
- 6. Dependencies
- 7. Resource Management
- 8. Development vs Production
- 9. Health Checks
- 10. Logging
- 11. Secrets Management
- 12. Complete Examples
- 13. Best Practices
- 14. Common Patterns

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
