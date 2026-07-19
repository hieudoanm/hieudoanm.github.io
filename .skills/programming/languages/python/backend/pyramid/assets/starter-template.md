# Pyramid Best Practices: Starter Template

A reusable starting point derived from the **1. Configuration & Setup** section of [Pyramid Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("pyramid_jinja2")
    config.add_route("home", "/")
    config.scan()
    return config.make_wsgi_app()
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
