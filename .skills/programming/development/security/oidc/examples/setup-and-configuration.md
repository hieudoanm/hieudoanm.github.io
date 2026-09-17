# OpenID Connect Best Practices: 2. OIDC Flows

## Source guidance

This example applies the **2. OIDC Flows** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Authorization Code Flow** — recommended for server-side apps:
- **Authorization Code Flow with PKCE** — for mobile and SPA apps:
- **Implicit Flow** — deprecated, avoid if possible:

## Example

```typescript
// Generate PKCE parameters
const { codeVerifier, codeChallenge } = generatePKCE()

// Authorization request with PKCE
const authUrl = `https://auth.example.com/authorize?` +
  `response_type=code&` +
  `client_id=${clientId}&` +
  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
  `scope=${encodeURIComponent('openid profile email')}&` +
  `code_challenge=${codeChallenge}&` +
  `code_challenge_method=S256&` +
  `state=${state}&` +
  `nonce=${nonce}`
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for oidc-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
