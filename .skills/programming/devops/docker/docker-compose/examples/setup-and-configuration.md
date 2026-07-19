# Docker Compose Best Practices: 3. Service Configuration

## Source guidance

This example applies the **3. Service Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Build configuration** — configure build options:
- **Environment variables** — use environment variables:
- **Ports** — expose ports appropriately:

## Example

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
      args:
        NODE_VERSION: 18
    image: myapp:1.2.3
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for docker-compose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
