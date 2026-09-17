---
name: "github-actions-best-practices"
description: "Best practices for using GitHub Actions for CI/CD. Use when creating, structuring, or reviewing GitHub Actions workflows — covers workflow design, job optimization, security, and deployment."
tags:
  - "programming"
  - "devops"
  - "ci"
  - "github"
  - "actions"
when_to_use: "Use when creating, structuring, or reviewing GitHub Actions workflows."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../jenkins/SKILL.md"
  - "../travis-ci/SKILL.md"
  - "../circle-ci/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# GitHub Actions Best Practices

GitHub Actions is a CI/CD platform integrated with GitHub. Best practice is to design workflows efficiently, use caching for speed, implement proper security, follow GitHub Actions conventions, and optimize for performance and maintainability.

## When to use

Use when creating, structuring, or reviewing GitHub Actions workflows.

## Prerequisites

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Workflow design** — design workflows efficiently
- **Caching** — use caching for speed
- **Matrix strategy** — test across multiple configurations
- **Secrets** — use GitHub Secrets for sensitive data
- **Artifacts** — use artifacts for file sharing
- **Security** — implement security best practices
- **Documentation** — document workflows
- [ ] Appropriate workflow triggers configured

## Focus areas

- 1. Core Concepts
- 2. Workflow Structure
- 3. Workflow Triggers
- 4. Job Configuration
- 5. Caching
- 6. Matrix Strategy
- 7. Secrets Management
- 8. Artifacts
- 7. Deployment
- 8. Docker
- 9. Reusable Workflows
- 10. Security

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
