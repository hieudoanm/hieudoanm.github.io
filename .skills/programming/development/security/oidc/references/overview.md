# Overview

Focused reference for **oidc-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# OpenID Connect Best Practices

OpenID Connect (OIDC) is an authentication layer built on top of OAuth 2.0. Best practice is to use OIDC for authentication, implement proper ID token validation, handle claims correctly, and follow OIDC security best practices.

---

## 1. Core Concepts

- **OIDC vs OAuth 2.0** — OIDC adds authentication to OAuth 2.0 authorization
- **ID Token** — JWT that contains user identity information
- **UserInfo endpoint** — endpoint to retrieve additional user information
- **Claims** — standard and custom claims about the user
- **Discovery** — automatic discovery of OIDC provider configuration

---

## 2. OIDC Flows

- **Authorization Code Flow** — recommended for server-side apps:

```typescript
// Redirect to authorization server
const authUrl = `https://auth.example.com/authorize?` +
  `response_type=code&` +
  `client_id=${clientId}&` +
  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
  `scope=${encodeURIComponent('openid profile email')}&` +
  `state=${state}&` +
  `nonce=${nonce}`

// Exchange code for tokens
async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    })
  })

  return response.json()
}
```

- **Authorization Code Flow with PKCE** — for mobile and SPA apps:

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

- **Implicit Flow** — deprecated, avoid if possible:

```typescript
// NOT RECOMMENDED - Use authorization code flow instead
const authUrl = `https://auth.example.com/authorize?` +
  `response_type=id_token token&` +
  `client_id=${clientId}&` +
  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
  `scope=${encodeURIComponent('openid profile email')}&` +
  `state=${state}&` +
  `nonce=${nonce}`
```

---

## 3. ID Token Validation

- **ID token structure** — ID token is a JWT with specific claims:

```json
{
  "iss": "https://auth.example.com",
  "sub": "1234567890",
  "aud": "client-id",
  "exp": 1516239022,
  "iat": 1516235422,
  "nonce": "random-nonce",
  "email": "user@example.com",
  "email_verified": true,
  "name": "John Doe"
}
```

- **ID token validation** — validate ID token properly:

```typescript
import jwt from 'jsonwebtoken'

async function validateIdToken(idToken: string, nonce: string): Promise<JwtPayload> {
  // Fetch JWKS from authorization server
  const jwks = await fetchJwks('https://auth.example.com/.well-known/jwks.json')

  // Verify token signature
  const decoded = jwt.verify(idToken, jwks, {
    algorithms: ['RS256'],
    issuer: 'https://auth.example.com',
    audience: clientId
  }) as JwtPayload

  // Validate standard claims
  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token has expired')
  }

  if (decoded.iat && decoded.iat > Math.floor(Date.now() / 1000)) {
    throw new Error('Token issued in the future')
  }

  if (decoded.nonce !== nonce) {
    throw new Error('Invalid nonce')
  }

  return decoded
}
```
