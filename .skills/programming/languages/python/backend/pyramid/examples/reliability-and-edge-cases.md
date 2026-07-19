# Pyramid Best Practices: 5. Middleware & Add-ons

## Source guidance

This example applies the **5. Middleware & Add-ons** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **WSGI middleware via `config.add_tween`/wrapper care:**
- **Prefer the add-on ecosystem (jinja2, sqlalchemy scaffold, redis) over hand-rolled plumbing.**
- **Request lifecycle via subscriptions (`event.NewRequest`) for cross-cutting only.**

## Example

```python
config.add_tween("myapp.tweens.security_headers")
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for pyramid-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
