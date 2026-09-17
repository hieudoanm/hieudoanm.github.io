---
name: "jenkins-best-practices"
description: "Best practices for using Jenkins for CI/CD. Use when creating, structuring, or reviewing Jenkins pipelines — covers pipeline design, security, plugins, and optimization."
tags:
  - "programming"
  - "devops"
  - "ci"
  - "jenkins"
when_to_use: "Use when creating, structuring, or reviewing Jenkins pipelines."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../github-actions/SKILL.md"
  - "../travis-ci/SKILL.md"
  - "../circle-ci/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Jenkins Best Practices

Jenkins is an open-source automation server that provides CI/CD capabilities. Best practice is to use declarative pipelines, implement proper security, use plugins effectively, follow Jenkins conventions, and optimize for performance and maintainability.

## When to use

Use when creating, structuring, or reviewing Jenkins pipelines.

## Prerequisites

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Pipeline design** — use declarative pipelines
- **Triggers** — use appropriate triggers
- **Security** — use credentials for secrets
- **Performance** — use parallel execution
- **Maintenance** — use pipeline documentation
- **Plugins** — use appropriate plugins
- [ ] Declarative pipeline configured
- [ ] Appropriate triggers configured

## Focus areas

- 1. Core Concepts
- 2. Pipeline Structure
- 3. Pipeline Triggers
- 4. Agent Configuration
- 5. Parallel Execution
- 6. Environment Variables
- 7. Tools
- 8. Build Parameters
- 9. Post-Build Actions
- 10. Docker

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
