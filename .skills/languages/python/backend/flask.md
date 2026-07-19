---
name: flask-best-practices
description: Best practices for building Python web apps with Flask — the lightweight WSGI framework conventions. Use when writing, structuring, or reviewing Flask — covers app structure, blueprints, config, requests, ORM, and deployment.
---

# Flask Best Practices

Flask is **a minimal WSGI micro-framework with a large extension ecosystem** — `app = Flask(__name__)` + routes; structure grows with blueprints. Practical Flask leans on **an application factory (`create_app`) + blueprints for modular structure, config objects/environment-driven settings, extensions as declared dependencies, and thin routes with the domain in services** — small core; the factory pattern keeps projects structured as they grow.

---

## 1. App Factory & Blueprints

- **Structure via factory + blueprints:**

```python
def create_app(config_object=ProdConfig):
    app = Flask(__name__)
    app.config.from_object(config_object)
    app.register_blueprint(orders.api, url_prefix="/api/orders")
    return app
```

- **One factory = testable, per-env configs; blueprints per domain.**
- **`app.config` typed reads; no module-level `app` import-coupling.**

---

## 2. Configuration

- **Config objects by environment; env-vars override; secrets external:**

```python
class ProdConfig:
    SECRET_KEY = os.environ["FLASK_SECRET_KEY"]
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
```

- **Never ship secrets in config; `instance_relative_config`/`.env` for local only.**
- **`DEBUG`/`TESTING` per env; logging configured in the factory.**

---

## 3. Routes & Views

- **Routes thin; `@route` with methods explicit; inputs validated:**

```python
@app.get("/api/orders/<order_id>")
def get_order(order_id: str):
    order = service.get_order(order_id)
    if order is None:
        abort(404)
    return order, 200
```

- **JSON in/out via `app.json`/`flask` tools; responses plain dicts.**
- **Validation at the boundary (request schema checks) before the service call.**

---

## 4. Extensions & ORM

- **Extensions wired in the factory (`db.init_app(app)`), models explicit:**

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
```

- **Flask-SQLAlchemy + migrations (Alembic/Flask-Migrate) — never hand-altering schema.**
- **Session/transaction scoped per request; `db.session` patterns documented.**

---

## 5. Resilience & Middleware

- **Error handlers (`@app.errorhandler(404)`/files) + request logging once:**

```python
@app.errorhandler(404)
def not_found(e):
    return {"error": "not found"}, 404
```

- **CORS/security via Flask-CORS/`after_request` headers only where justified.**
- **Rate-limit (Flask-Limiter) at the API seam; secrets via env.**

---

## 6. Testing & Deployment

- **Tests under `pytest` with an app factory fixture + test DB:**

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