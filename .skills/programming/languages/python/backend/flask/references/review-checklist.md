# Review checklist

Focused reference for **flask-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```python
@pytest.fixture
def app():
    app = create_app(TestConfig)
    with app.app_context():
        db.create_all()
    yield app
```

- **Test client exercises routes; response contracts asserted.**
- **Deploy via a WSGI server (gunicorn) with the factory; health/graceful shutdown; CI lint+test.**

---

## General Rules of Thumb

- **Factory + blueprints for structure.**
- **Config objects + env; secrets external.**
- **Thin routes; domain in services; validated inputs.**
- **Extensions via the factory; migrations for schema.**
- **pytest with app factory; WSGI deploy; CI gates.**

---

## Quick-Start Checklist

- [ ] `create_app` factory; blueprints per domain
- [ ] Config classes per env; secrets via env/secret manager
- [ ] Routes thin; inputs validated; responses plain dicts
- [ ] SQLAlchemy init in factory; Alembic/Flask-Migrate schema
- [ ] Error handlers + logging + CORS/ratelimit minimal
- [ ] pytest app-fixture tests; gunicorn deploy; CI lint/test
