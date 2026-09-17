# Django Best Practices: Validation Plan

Use this plan to verify work guided by [Django Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Middleware in MIDDLEWARE settings; use Django's built-ins:**
- [ ] **CSRF enabled; SECURE_SSL_REDIRECT, SECURE_HSTS_SECONDS in production.**
- [ ] **Authentication via Django auth or DRF tokens; custom permissions as needed.**
- [ ] **Tests in tests.py per app; Django's test client:**
- [ ] **Test client exercises views; assert status/content.**
- [ ] **DRF tests use APIClient for API testing.**
- [ ] **WSGI server (gunicorn) in production; ALLOWED_HOSTS configured:**
- [ ] **Static files served via Whitenoise or CDN in production.**
- [ ] **Database migrations run before app startup.**
- [ ] **Environment variables for configuration; secrets via env.**

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
