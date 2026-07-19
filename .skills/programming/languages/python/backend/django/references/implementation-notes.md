# Implementation notes

Focused reference for **django-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```html
<!-- base.html -->
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- orders/index.html -->
{% extends 'base.html' %}
{% block content %}
<h1>Orders</h1>
{% endblock %}
```

- **Static files in `static/`; `collectstatic` for production.**
- **Template inheritance for shared layouts; blocks for content.**

---

## 7. Middleware & Security

- **Middleware in `MIDDLEWARE` settings; use Django's built-ins:**

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]
```

- **CSRF enabled; `SECURE_SSL_REDIRECT`, `SECURE_HSTS_SECONDS` in production.**
- **Authentication via Django auth or DRF tokens; custom permissions as needed.**

---

## 8. Admin Interface

- **Register models in `admin.py` for quick CRUD:**

```python
from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'status', 'total', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__email']
```

- **Custom admin actions for bulk operations.**
- **Limit admin access via `is_staff`/`is_superuser`.**

---

## 9. Testing

- **Tests in `tests.py` per app; Django's test client:**
