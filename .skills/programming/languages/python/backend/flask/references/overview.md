# Overview

Focused reference for **flask-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
