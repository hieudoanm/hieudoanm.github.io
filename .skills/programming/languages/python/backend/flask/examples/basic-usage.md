# Flask Best Practices: Basic Usage

Best practices for building Python web apps with Flask — the lightweight WSGI framework conventions. Use when writing, structuring, or reviewing Flask — covers app structure, blueprints, config, requests, ORM, and deployment.

## Scenario

Use this example as a starting point when applying **flask-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. App Factory & Blueprints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
def create_app(config_object=ProdConfig):
    app = Flask(__name__)
    app.config.from_object(config_object)
    app.register_blueprint(orders.api, url_prefix="/api/orders")
    return app
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
