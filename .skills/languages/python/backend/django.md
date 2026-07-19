---
name: django-best-practices
description: Best practices for building Python web apps with Django — the batteries-included framework conventions. Use when writing, structuring, or reviewing Django — covers project structure, apps, models, views, ORM, and deployment.
---

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

```python
from django.db import models

class Order(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=OrderStatus.choices)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'created_at']),
        ]
```

- **Use explicit `on_delete`; index frequently queried fields.**
- **Migrations via `makemigrations`/`migrate` — never hand-alter schema.**
- **QuerySets in managers or services; keep views thin.**

---

## 4. Views & URLs

- **Class-based views for HTTP; URLconf maps to view classes:**

```python
# views.py
from django.views import View
from django.http import JsonResponse

class OrderListView(View):
    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        return JsonResponse({'orders': list(orders.values())})

# urls.py
from django.urls import path
from .views import OrderListView

urlpatterns = [
    path('orders/', OrderListView.as_view(), name='order-list'),
]
```

- **REST views via Django REST Framework (DRF) for APIs:**
- **Thin views; business logic in services or model methods.**
- **URL namespacing per app to avoid conflicts.**

---

## 5. Django REST Framework

- **Serializers for input/output; ViewSets for CRUD:**

```python
from rest_framework import serializers, viewsets

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

- **Serializers define API contracts; ViewSets provide standard CRUD.**
- **Permissions via DRF permission classes; authentication via JWT/session.**
- **Routers for ViewSet URL registration.**

---

## 6. Templates & Static Files

- **Templates in app `templates/` dirs; `extends` for base layouts:**

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

```python
from django.test import TestCase
from django.urls import reverse

class OrderViewTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('test@example.com', 'password')

    def test_order_list_requires_auth(self):
        response = self.client.get(reverse('order-list'))
        self.assertEqual(response.status_code, 302)  # Redirect to login
```

- **Test client exercises views; assert status/content.**
- **DRF tests use `APIClient` for API testing.**

---

## 10. Deployment

- **WSGI server (gunicorn) in production; `ALLOWED_HOSTS` configured:**

```bash
gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
```

- **Static files served via Whitenoise or CDN in production.**
- **Database migrations run before app startup.**
- **Environment variables for configuration; secrets via env.**

---

## General Rules of Thumb

- **Apps per bounded context; settings split by environment.**
- **Models explicit with relationships; migrations for schema.**
- **Class-based views; business logic in services.**
- **DRF for APIs; serializers define contracts.**
- **Middleware for cross-cutting; security via Django/DRF.**
- **Tests per app; Django test client for views.**

---

## Quick-Start Checklist

- [ ] Project via `startproject`; apps per domain
- [ ] Settings split by environment; secrets via env
- [ ] Models with explicit fields; migrations tracked
- [ ] Class-based views or DRF ViewSets
- [ ] URLs namespaced per app
- [ ] Middleware configured; security settings in prod
- [ ] Admin registered for quick CRUD
- [ ] Tests per app; Django test client
- [ ] Gunicorn WSGI server in production
- [ ] Static files collected/served properly
