---
name: "django-best-practices"
description: "Best practices for building Python web apps with Django — the batteries-included framework conventions. Use when writing, structuring, or reviewing Django — covers project structure, apps, models, views, ORM, and deployment."
tags:
  - "programming"
  - "language"
  - "python"
  - "backend"
  - "django"
when_to_use: "Use when writing, structuring, or reviewing Django."
prerequisites:
  - "Basic familiarity with Python and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../flask/SKILL.md"
  - "../pyramid/SKILL.md"
  - "../tornado/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Django Best Practices

Django is **a full-featured web framework with ORM, templates, authentication, and admin** — python manage.py startproject + apps. Practical Django leans on **apps for modular structure, models for domain, class-based views for HTTP handling, Django REST Framework for APIs, and proper settings separation** — batteries included, but discipline keeps projects maintainable as they grow.

## When to use

Use when writing, structuring, or reviewing Django.

## Prerequisites

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Apps per bounded context; settings split by environment.**
- **Models explicit with relationships; migrations for schema.**
- **Class-based views; business logic in services.**
- **DRF for APIs; serializers define contracts.**
- **Middleware for cross-cutting; security via Django/DRF.**
- **Tests per app; Django test client for views.**
- [ ] Project via startproject; apps per domain
- [ ] Settings split by environment; secrets via env

## Focus areas

- 1. Project Structure & Apps
- 2. Settings & Configuration
- 3. Models & ORM
- 4. Views & URLs
- 5. Django REST Framework
- 6. Templates & Static Files
- 7. Middleware & Security
- 8. Admin Interface
- 9. Testing
- 10. Deployment

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
