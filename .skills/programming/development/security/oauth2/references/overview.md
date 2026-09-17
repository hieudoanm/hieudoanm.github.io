# Overview

Focused reference for **oauth2-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# OAuth 2.0 Best Practices

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts. Best practice is to use appropriate grant types, implement proper security measures, handle tokens securely, and follow OAuth 2.0 security best practices.

---

## 1. Core Concepts

- **Roles** — resource owner, client, authorization server, resource server
- **Grant types** — authorization code, implicit, client credentials, device code, refresh token
- **Tokens** — access tokens and refresh tokens
- **Scopes** — permissions requested by the client
- **Security** — PKCE, state parameter, HTTPS, token validation

---

## 2. Grant Types

- **Authorization Code** — most secure for server-side apps:

```typescript
// Redirect user to authorization server
const authUrl = `https://auth.example.com/authorize?` +
  `response_type=code&` +
  `client_id=${clientId}&` +
  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
  `scope=${encodeURIComponent(scope)}&` +
  `state=${state}`

// Exchange authorization code for access token
async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
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

- **Authorization Code with PKCE** — for mobile and SPA apps:

```typescript
// Generate code verifier and challenge
function generatePKCE(): { codeVerifier: string; codeChallenge: string } {
  const codeVerifier = generateRandomString(128)
  const codeChallenge = base64UrlEncode(
    crypto.createHash('sha256').update(codeVerifier).digest()
  )

  return { codeVerifier, codeChallenge }
}

// Authorization request with PKCE
const authUrl = `https://auth.example.com/authorize?` +
  `response_type=code&` +
  `client_id=${clientId}&` +
  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
  `code_challenge=${codeChallenge}&` +
  `code_challenge_method=S256&` +
  `state=${state}`

// Token exchange with PKCE
async function exchangeCodeForTokenWithPKCE(
  code: string,
  codeVerifier: string
): Promise<TokenResponse> {
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
      code_verifier: codeVerifier
    })
  })

  return response.json()
}
```

- **Client Credentials** — for service-to-service authentication:

```typescript
async function getClientCredentialsToken(): Promise<TokenResponse> {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64Encode(`${clientId}:${clientSecret}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: scope
    })
  })

  return response.json()
}
```

---

## 3. Security Best Practices
