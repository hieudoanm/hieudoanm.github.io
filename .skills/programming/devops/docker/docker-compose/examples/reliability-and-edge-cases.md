# Docker Compose Best Practices: 8. Development vs Production

## Source guidance

This example applies the **8. Development vs Production** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use `profiles` to fence off optional services** — tag dev-only or on-demand services so a bare `docker compose up` starts only what production needs, and opt in explicitly when you want the rest:
Profiles keep optional infrastructure in the same file as production without polluting the default
bring-up, which is why they are usually better than a separate `docker-compose.override.yml` for
anything other than plain local mounts.
- **Development Compose** — optimize for development:
- **Production Compose** — optimize for production:
- **Override files** — use override files:

## Example

```yaml
services:
  app:
    build: .
  mailhog:
    image: mailhog/mailhog # only starts under the "dev" profile
    profiles: ['dev']

# docker compose up              -> app only
# docker compose --profile dev up -> app + mailhog
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for docker-compose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
