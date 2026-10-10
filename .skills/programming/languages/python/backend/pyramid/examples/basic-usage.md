# Pyramid Best Practices: Basic Usage

Best practices for building web apps with Pyramid — the lightweight, flexible Python web framework conventions. Use when writing, structuring, or reviewing Pyramid — covers config, routes/views, traversal, authentication, and deployment.

## Scenario

Use this example as a starting point when applying **pyramid-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Configuration & Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("pyramid_jinja2")
    config.add_route("home", "/")
    config.scan()
    return config.make_wsgi_app()
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
