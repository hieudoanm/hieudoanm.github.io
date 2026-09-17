# Play Framework Backend Best Practices: 7. Configuration & Portability

## Source guidance

This example applies the **7. Configuration & Portability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Configuration via `application.conf`** with environment-based overrides (`reference.conf` + env substitution):
- **Externalize secrets** — never hardcode credentials; env vars / secret store.
- **Portable across** — web server, background workers, CLI tasks (same domain/services, different entrypoints).
- **Avoid leaking framework types across layers** — services don't know about Play controllers/requests; domain models are plain Scala.

## Example

```hocon
db.default.url = ${?DB_URL}
auth.jwt.secret = ${?JWT_SECRET}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for play-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
