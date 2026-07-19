# Docker Best Practices: 4. Security Best Practices

## Source guidance

This example applies the **4. Security Best Practices** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use minimal base images** — prefer Alpine or distroless:
- **Run as non-root user** — avoid running as root:
- **Scan for vulnerabilities** — use security scanning tools:
- **Don't include secrets** — never include secrets in images:

## Example

```dockerfile
# Good - Minimal
FROM node:18-alpine
FROM gcr.io/distroless/nodejs:18

# Avoid - Large base images
FROM node:18
FROM ubuntu:latest
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for docker-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
