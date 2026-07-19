# OpenID Connect Best Practices: 9. Security Best Practices

## Source guidance

This example applies the **9. Security Best Practices** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Nonce validation** — always validate nonce:
- **State parameter** — use state parameter:
- **HTTPS only** — enforce HTTPS:

## Example

```typescript
function generateNonce(): string {
  return crypto.randomBytes(32).toString('base64')
}

// Store nonce in session
session.oidcNonce = generateNonce()

// Validate nonce on callback
if (decoded.nonce !== session.oidcNonce) {
  throw new Error('Invalid nonce')
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for oidc-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
