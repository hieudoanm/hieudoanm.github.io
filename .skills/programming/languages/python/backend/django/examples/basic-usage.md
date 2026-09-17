# Django Best Practices: Basic Usage

Best practices for building Python web apps with Django — the batteries-included framework conventions. Use when writing, structuring, or reviewing Django — covers project structure, apps, models, views, ORM, and deployment.

## Scenario

Use this example as a starting point when applying **django-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Project Structure & Apps** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
# Project structure
myproject/
├── manage.py
├── myproject/
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
└── apps/
    ├── users/
    ├── orders/
    └── products/
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
