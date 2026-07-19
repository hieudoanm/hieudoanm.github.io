# Django Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Tests in `tests.py` per app; Django's test client:**
- **Test client exercises views; assert status/content.**
- **DRF tests use `APIClient` for API testing.**

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for django-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
