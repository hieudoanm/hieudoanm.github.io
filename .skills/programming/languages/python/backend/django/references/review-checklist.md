# Review checklist

Focused reference for **django-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
