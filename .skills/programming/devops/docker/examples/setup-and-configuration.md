# Docker Best Practices: 7. Configuration Management

## Source guidance

This example applies the **7. Configuration Management** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Environment variables** — use environment variables:
- **Entry point scripts** — use entry point scripts:

## Example

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for docker-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
