# JWT Best Practices: 7. Security Best Practices

## Source guidance

This example applies the **7. Security Best Practices** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Strong algorithms** — use strong signing algorithms:
- **Short expiration** — use short expiration times:
- **Token revocation** — implement token revocation:

## Example

```typescript
// Good - RS256 (asymmetric)
jwt.sign(payload, privateKey, { algorithm: 'RS256' })

// Good - ES256 (asymmetric)
jwt.sign(payload, privateKey, { algorithm: 'ES256' })

// Avoid - HS256 (symmetric) unless properly secured
jwt.sign(payload, secret, { algorithm: 'HS256' })

// Avoid - none (no signature)
jwt.sign(payload, '', { algorithm: 'none' })
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for jwt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
