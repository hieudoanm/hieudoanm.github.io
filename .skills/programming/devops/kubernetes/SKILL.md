---
name: "kubernetes-best-practices"
description: "Best practices for using Kubernetes for container orchestration. Use when creating, structuring, or reviewing Kubernetes configurations — covers pod management, deployments, services, configuration, and cluster operations."
tags:
  - "programming"
  - "devops"
  - "kubernetes"
when_to_use: "Use when creating, structuring, or reviewing Kubernetes configurations."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../docker/SKILL.md"
  - "../makefile/SKILL.md"
  - "../docker/docker-compose/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Kubernetes Best Practices

Kubernetes is a container orchestration platform for automating deployment, scaling, and management of containerized applications. Best practice is to follow Kubernetes conventions, implement proper resource management, use configuration effectively, and follow security best practices.

## When to use

Use when creating, structuring, or reviewing Kubernetes configurations.

## Prerequisites

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Declarative configuration** — use YAML files for configuration
- **Resource limits** — set resource requests and limits
- **Health checks** — implement liveness and readiness probes
- **Security** — use security contexts and RBAC
- **Namespaces** — organize resources with namespaces
- **Monitoring** — implement monitoring and logging
- **Image tags** — use specific image tags
- **Documentation** — document Kubernetes configurations

## Focus areas

- 1. Core Concepts
- 2. Pod Configuration
- 3. Deployment Configuration
- 4. Service Configuration
- 5. Configuration Management
- 6. Namespace Organization
- 7. Ingress Configuration
- 8. Autoscaling
- 9. Storage
- 10. Security Best Practices
- 11. Monitoring and Logging
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
