# Implementation notes

Focused reference for **pyramid-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
