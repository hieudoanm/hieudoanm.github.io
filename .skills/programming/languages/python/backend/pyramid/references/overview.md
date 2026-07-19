# Overview

Focused reference for **pyramid-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Pyramid Best Practices

Pyramid is **a minimalist-but-expansive Python web framework** — small core with batteries through add-ons; routes + views with declarative config. Practical Pyramid leans on **declarative configuration (`config.add_route`/decorators or include-mechanism), views as plain callables with typed decorators, `request`-driven context, and authentication via its security model (`authentication_policy` + `authorization_policy`)** — start small, add complexity you can justify.

---

## 1. Configuration & Setup

- **One wsgi entry; declaration via `config` + includes:**

```python
from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("pyramid_jinja2")
    config.add_route("home", "/")
    config.scan()
    return config.make_wsgi_app()
```

- **Routes declared explicitly; `config.scan()` finds views.**
- **Settings via `.ini`/env; a small number of well-chosen includes.**

---

## 2. Views & Routing
