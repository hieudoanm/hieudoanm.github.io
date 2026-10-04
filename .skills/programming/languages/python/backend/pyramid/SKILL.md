---
name: pyramid-best-practices
description: Best practices for building web apps with Pyramid — the lightweight, flexible Python web framework conventions. Use when writing, structuring, or reviewing Pyramid — covers config, routes/views, traversal, authentication, and deployment.
---

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

- **Views as plain functions decorated or routed:**

```python
@view_config(route_name="order", renderer="json")
def order_view(request):
    return {"id": request.matchdict["order_id"]}
```

- **`renderer` explicit (json/template); views return plain shapes — no strung responses.**
- **Validation at the boundary: `request.params`/`matchdict` checked before the domain.**

---

## 3. Traversal vs URL Dispatch

- **Default URL dispatch (routes) is fine for APIs; traversal for data-shaped URLs:**
- **Choose ONE primary model; document edge-hybrids (traversal contexts vs routes) sparingly.**
- **`request.context` meaningful in traversal; keep the models lean in dispatch mode.**

---

## 4. Authentication & Authorization

- **Security via `authentication_policy` + `authorization_policy`:**

```python
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy

config.set_authentication_policy(AuthTktAuthenticationPolicy(secret, hashalg="sha512"))
config.set_authorization_policy(ACLAuthorizationPolicy())
```

- **`__acl__`/`context` permissions enforced at views (`permission="edit"`).**
- **CSRF (`pyramid.csrf`) on for forms; secrets via env, never in code.**

---

## 5. Middleware & Add-ons

- **WSGI middleware via `config.add_tween`/wrapper care:**

```python
config.add_tween("myapp.tweens.security_headers")
```

- **Prefer the add-on ecosystem (jinja2, sqlalchemy scaffold, redis) over hand-rolled plumbing.**
- **Request lifecycle via subscriptions (`event.NewRequest`) for cross-cutting only.**

---

## 6. Deployment & Testing

- **Deploy behind a real WSGI server (gunicorn/uvicorn) with one app factory:**
- **`webtest` harness for view tests (fixture ORM per test), response contracts asserted:**
- **Structure: `pyramid_create`/scaffold style — models/views/config separated; CI lint + tests.**

---

## General Rules of Thumb

- **Small explicit core; includes for batteries.**
- **Views plain + renderer'd; validated inputs.**
- **Dispatch/traversal chosen once; documented.**
- **Auth via policy pair; CSRF on; secrets env-only.**
- **WSGI server + webtest; additive complexity justified.**

---

## Quick-Start Checklist

- [ ] Configurator + explicit routes; `scan()` finds views
- [ ] Views render to json/templates; inputs validated
- [ ] Dispatch vs traversal decided + consistent
- [ ] AuthTkt + ACL policies set; `__acl__`/permissions on views
- [ ] CSRF enabled; secrets via env; tweens minimal
- [ ] webtest view tests; WSGI deploy; CI lint/test