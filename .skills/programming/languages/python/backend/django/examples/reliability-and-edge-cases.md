# Django Best Practices: 7. Middleware & Security

## Source guidance

This example applies the **7. Middleware & Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Middleware in `MIDDLEWARE` settings; use Django's built-ins:**
- **CSRF enabled; `SECURE_SSL_REDIRECT`, `SECURE_HSTS_SECONDS` in production.**
- **Authentication via Django auth or DRF tokens; custom permissions as needed.**

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for django-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
