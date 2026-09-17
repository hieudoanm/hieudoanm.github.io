---
name: "docker-best-practices"
description: "Best practices for using Docker for containerization. Use when creating, structuring, or reviewing Dockerfiles and Docker configurations — covers image optimization, security, multi-stage builds, and container orchestration."
tags:
  - "programming"
  - "devops"
  - "docker"
when_to_use: "Use when creating, structuring, or reviewing Dockerfiles and Docker configurations."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../kubernetes/SKILL.md"
  - "docker-compose/SKILL.md"
  - "../makefile/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Docker Best Practices

Docker is a platform for developing, shipping, and running applications in containers. Best practice is to create optimized images, implement security measures, use multi-stage builds, and follow Docker best practices for maintainability and performance.

## When to use

Use when creating, structuring, or reviewing Dockerfiles and Docker configurations.

## Prerequisites

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Small images** — keep images small for faster builds and deployments
- **Layer caching** — leverage Docker's layer caching for faster builds
- **Security** — scan images for vulnerabilities and use minimal base images
- **Reproducibility** — use specific tags and build arguments for reproducible builds
- **Efficiency** — optimize for build time, image size, and runtime performance
- **Small images** — use minimal base images and multi-stage builds
- **Layer caching** — order instructions to maximize caching
- **Security** — run as non-root, scan for vulnerabilities

## Focus areas

- 1. Core Principles
- 2. Dockerfile Structure
- 3. Image Optimization
- 4. Security Best Practices
- 5. Build Optimization
- 6. Runtime Best Practices
- 7. Configuration Management
- 8. Multi-Platform Builds
- 9. Development vs Production
- 10. Testing
- 11. Monitoring and Logging
- 12. Dockerfile Examples

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
