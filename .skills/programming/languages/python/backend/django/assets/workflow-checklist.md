# Django Best Practices: Workflow Checklist

A practical run sheet for applying [Django Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure & Apps: **Project via startproject; modular apps/ for domains:**
- [ ] 1. Project Structure & Apps: **One app per bounded context; apps.py defines config.**
- [ ] 2. Settings & Configuration: **Settings by environment; DJANGO_SETTINGS_MODULE selects:**
- [ ] 2. Settings & Configuration: **Never ship SECRET_KEY or credentials in code; use env vars or secrets manager.**
- [ ] 3. Models & ORM: **Models defined per app; explicit field types and relationships:**
- [ ] 3. Models & ORM: **Use explicit on_delete; index frequently queried fields.**
- [ ] 4. Views & URLs: **Class-based views for HTTP; URLconf maps to view classes:**
- [ ] 4. Views & URLs: **REST views via Django REST Framework (DRF) for APIs:**
- [ ] 5. Django REST Framework: **Serializers for input/output; ViewSets for CRUD:**
- [ ] 5. Django REST Framework: **Serializers define API contracts; ViewSets provide standard CRUD.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
