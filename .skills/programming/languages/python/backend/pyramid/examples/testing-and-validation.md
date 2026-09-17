# Pyramid Best Practices: 6. Deployment & Testing

## Source guidance

This example applies the **6. Deployment & Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Deploy behind a real WSGI server (gunicorn/uvicorn) with one app factory:**
- **`webtest` harness for view tests (fixture ORM per test), response contracts asserted:**
- **Structure: `pyramid_create`/scaffold style — models/views/config separated; CI lint + tests.**

## Example

A team applying **6. Deployment & Testing** to a Pyramid Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Deploy behind a real WSGI server (gunicorn/uvicorn) with one app factory:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for pyramid-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
