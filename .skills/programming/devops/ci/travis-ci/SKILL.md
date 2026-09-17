---
name: "travis-ci-best-practices"
description: "Best practices for using Travis CI for CI/CD. Use when creating, structuring, or reviewing Travis CI configurations — covers build matrix, caching, deployment, and optimization."
tags:
  - "programming"
  - "devops"
  - "ci"
  - "travis"
when_to_use: "Use when creating, structuring, or reviewing Travis CI configurations."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../github-actions/SKILL.md"
  - "../jenkins/SKILL.md"
  - "../circle-ci/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Travis CI Best Practices

Travis CI is a CI/CD platform that integrates with GitHub. Best practice is to use build matrices for multiple configurations, implement caching for speed, use environment variables for configuration, follow Travis CI conventions, and optimize for performance and maintainability.

## When to use

Use when creating, structuring, or reviewing Travis CI configurations.

## Prerequisites

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Build matrix** — test across multiple configurations
- **Caching** — use caching for speed
- **Stages** — use stages for organization
- **Security** — use encrypted secrets
- **Notifications** — configure notifications
- **Documentation** — document builds
- [ ] Appropriate language configured
- [ ] Build matrix configured

## Focus areas

- 1. Core Concepts
- 2. Configuration Structure
- 3. Build Matrix
- 4. Caching
- 5. Stages
- 6. Environment Variables
- 7. Deployment
- 8. Docker
- 9. Notifications

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
