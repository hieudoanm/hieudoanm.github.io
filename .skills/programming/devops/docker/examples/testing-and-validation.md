# Docker Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Container testing** — test containers:
- **Integration testing** — test with Docker Compose:

## Example

```bash
# Run tests in container
docker run --rm myapp:latest npm test

# Interactive container for debugging
docker run -it --rm myapp:latest sh
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for docker-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
