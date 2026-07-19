# Flask Best Practices: 6. Testing & Deployment

## Source guidance

This example applies the **6. Testing & Deployment** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Tests under `pytest` with an app factory fixture + test DB:**
- **Test client exercises routes; response contracts asserted.**
- **Deploy via a WSGI server (gunicorn) with the factory; health/graceful shutdown; CI lint+test.**

## Example

```python
@pytest.fixture
def app():
    app = create_app(TestConfig)
    with app.app_context():
        db.create_all()
    yield app
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for flask-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
