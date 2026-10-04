---
name: oauth2-best-practices
description: Best practices for implementing OAuth 2.0 for authorization. Use when designing, implementing, or reviewing OAuth 2.0 implementations — covers grant types, token management, security considerations, and integration patterns.
---

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

- **State parameter** — use state parameter to prevent CSRF:

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

- **PKCE** — use PKCE for public clients:

```typescript
// Required for mobile apps, SPAs, and native apps
const { codeVerifier, codeChallenge } = generatePKCE()
```

- **HTTPS only** — enforce HTTPS for all OAuth flows:

```typescript
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return res.status(400).json({ error: 'HTTPS required' })
}
```

---

## 4. Token Management

- **Token storage** — store tokens securely:

```typescript
// Server-side: store in encrypted session or database
async function storeToken(userId: string, token: TokenResponse): Promise<void> {
  const encryptedToken = encrypt(JSON.stringify(token))
  await database.tokens.insert({
    userId,
    token: encryptedToken,
    expiresAt: new Date(Date.now() + token.expires_in * 1000)
  })
}

// Client-side: use HTTP-only cookies
function setTokenCookie(res: Response, token: string): void {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: token.expires_in * 1000
  })
}
```

- **Token refresh** — implement token refresh:

```typescript
async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret
    })
  })

  return response.json()
}
```

- **Token revocation** — implement token revocation:

```typescript
async function revokeToken(token: string): Promise<void> {
  await fetch('https://auth.example.com/revoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token: token,
      client_id: clientId,
      client_secret: clientSecret
    })
  })
}
```

---

## 5. Scope Management

- **Request minimal scopes** — request only necessary scopes:

```typescript
// Good - minimal scopes
const scope = 'read:profile'

// Bad - excessive scopes
const scope = 'read:profile write:profile read:email write:email read:contacts'
```

- **Scope validation** — validate scopes on resource server:

```typescript
function validateScopes(requiredScopes: string[], userScopes: string[]): boolean {
  return requiredScopes.every(scope => userScopes.includes(scope))
}

// In middleware
if (!validateScopes(['read:profile'], req.user.scopes)) {
  return res.status(403).json({ error: 'Insufficient scopes' })
}
```

---

## 6. Client Registration

- **Client types** — register appropriate client types:

```typescript
// Confidential client (server-side)
const confidentialClient = {
  client_id: 'confidential-client',
  client_secret: 'secret',
  redirect_uris: ['https://app.example.com/callback'],
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code']
}

// Public client (SPA, mobile)
const publicClient = {
  client_id: 'public-client',
  redirect_uris: ['https://app.example.com/callback'],
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  token_endpoint_auth_method: 'none' // No client secret
}
```

- **Redirect URI validation** — validate redirect URIs:

```typescript
function validateRedirectUri(redirectUri: string): boolean {
  const allowedUris = [
    'https://app.example.com/callback',
    'https://app.example.com/auth/callback'
  ]

  return allowedUris.includes(redirectUri)
}
```

---

## 7. Error Handling

- **Error responses** — handle OAuth errors properly:

```typescript
function handleOAuthError(error: OAuthError): void {
  switch (error.error) {
    case 'invalid_request':
      // Request is missing required parameters
      break
    case 'unauthorized_client':
      // Client is not authorized to use this grant type
      break
    case 'access_denied':
      // Resource owner denied the request
      break
    case 'unsupported_response_type':
      // Authorization server does not support response type
      break
    case 'invalid_scope':
      // Requested scope is invalid
      break
    case 'server_error':
      // Authorization server encountered an error
      break
    case 'temporarily_unavailable':
      // Authorization server is temporarily unavailable
      break
    default:
      // Unknown error
  }
}
```

---

## 8. Implementation Examples

- **OAuth client implementation** — implement OAuth client:

```typescript
class OAuthClient {
  constructor(
    private clientId: string,
    private clientSecret: string,
    private authorizationUrl: string,
    private tokenUrl: string
  ) {}

  getAuthorizationUrl(redirectUri: string, scope: string): string {
    const state = generateState()
    const { codeVerifier, codeChallenge } = generatePKCE()

    // Store state and code verifier in session
    this.storeSessionData(state, codeVerifier)

    return `${this.authorizationUrl}?` +
      `response_type=code&` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=S256&` +
      `state=${state}`
  }

  async exchangeCodeForToken(
    code: string,
    redirectUri: string,
    state: string
  ): Promise<TokenResponse> {
    // Validate state
    const sessionData = this.getSessionData(state)
    if (!sessionData) {
      throw new Error('Invalid state')
    }

    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: this.clientId,
        code_verifier: sessionData.codeVerifier
      })
    })

    return response.json()
  }
}
```

---

## 9. Testing

- **OAuth flow testing** — test OAuth flow:

```typescript
describe('OAuth Client', () => {
  it('should generate valid authorization URL', () => {
    const client = new OAuthClient(
      'client-id',
      'client-secret',
      'https://auth.example.com/authorize',
      'https://auth.example.com/token'
    )

    const authUrl = client.getAuthorizationUrl(
      'https://app.example.com/callback',
      'read:profile'
    )

    expect(authUrl).toContain('response_type=code')
    expect(authUrl).toContain('client_id=client-id')
    expect(authUrl).toContain('scope=read:profile')
    expect(authUrl).toContain('code_challenge=')
    expect(authUrl).toContain('state=')
  })

  it('should exchange code for token', async () => {
    const client = new OAuthClient(
      'client-id',
      'client-secret',
      'https://auth.example.com/authorize',
      'https://auth.example.com/token'
    )

    const tokenResponse = await client.exchangeCodeForToken(
      'authorization-code',
      'https://app.example.com/callback',
      'state'
    )

    expect(tokenResponse.access_token).toBeDefined()
    expect(tokenResponse.token_type).toBe('Bearer')
  })
})
```

---

## 10. General Rules of Thumb

- **Authorization Code** — use authorization code grant for server-side apps
- **PKCE** — use PKCE for public clients
- **State parameter** — always use state parameter
- **HTTPS** — enforce HTTPS for all OAuth flows
- **Minimal scopes** — request only necessary scopes
- **Token storage** — store tokens securely
- **Token refresh** — implement token refresh
- **Error handling** — handle OAuth errors properly

---

## Quick-Start Checklist

- [ ] Appropriate grant type selected
- [ ] PKCE implemented for public clients
- [ ] State parameter implemented
- [ ] HTTPS enforced
- [ ] Token storage secured
- [ ] Token refresh implemented
- [ ] Token revocation implemented
- [ ] Scope validation implemented
- [ ] Redirect URI validation
- [ ] Comprehensive error handling
