# JWT Best Practices: 2. JWT Structure

## Source guidance

This example applies the **2. JWT Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Header** — contains algorithm and token type:
- **Payload** — contains claims:
- **Signature** — cryptographic signature:

## Example

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for jwt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
