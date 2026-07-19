# OAuth 2.0 Best Practices: 3. Security Best Practices

## Source guidance

This example applies the **3. Security Best Practices** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **State parameter** — use state parameter to prevent CSRF:
- **PKCE** — use PKCE for public clients:
- **HTTPS only** — enforce HTTPS for all OAuth flows:

## Example

```typescript
function generateState(): string {
  return crypto.randomBytes(32).toString('base64')
}

// Store state in session
session.oauthState = generateState()

// Include state in authorization request
const authUrl = `https://auth.example.com/authorize?state=${session.oauthState}`

// Validate state on callback
if (req.query.state !== session.oauthState) {
  throw new Error('Invalid state parameter')
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for oauth2-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
