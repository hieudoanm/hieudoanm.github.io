# Pyramid Best Practices: 1. Configuration & Setup

## Source guidance

This example applies the **1. Configuration & Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One wsgi entry; declaration via `config` + includes:**
- **Routes declared explicitly; `config.scan()` finds views.**
- **Settings via `.ini`/env; a small number of well-chosen includes.**

## Example

This excerpt is from the cited **1. Configuration & Setup** section.

```python
from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("pyramid_jinja2")
    config.add_route("home", "/")
    config.scan()
    return config.make_wsgi_app()
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for pyramid-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
