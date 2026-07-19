# Overview

Focused reference for **django-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Django Best Practices

Django is **a full-featured web framework with ORM, templates, authentication, and admin** — `python manage.py startproject` + apps. Practical Django leans on **apps for modular structure, models for domain, class-based views for HTTP handling, Django REST Framework for APIs, and proper settings separation** — batteries included, but discipline keeps projects maintainable as they grow.

---

## 1. Project Structure & Apps

- **Project via `startproject`; modular `apps/` for domains:**

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

- **One app per bounded context; `apps.py` defines config.**
- **Settings split by environment; no secrets in version control.**

---

## 2. Settings & Configuration

- **Settings by environment; `DJANGO_SETTINGS_MODULE` selects:**

```python
# settings/base.py
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

- **Never ship `SECRET_KEY` or credentials in code; use env vars or secrets manager.**
- **`DEBUG = False` in production; logging configured per environment.**

---

## 3. Models & ORM

- **Models defined per app; explicit field types and relationships:**
