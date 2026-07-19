# Pyramid Best Practices: Validation Plan

Use this plan to verify work guided by [Pyramid Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Deploy behind a real WSGI server (gunicorn/uvicorn) with one app factory:**
- [ ] **webtest harness for view tests (fixture ORM per test), response contracts asserted:**
- [ ] **Structure: pyramid_create/scaffold style — models/views/config separated; CI lint + tests.**

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
