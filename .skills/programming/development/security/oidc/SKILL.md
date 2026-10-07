---
name: oidc-best-practices
description: Best practices for implementing OpenID Connect (OIDC) for authentication. Use when designing, implementing, or reviewing OIDC implementations — covers authentication flows, token validation, claims handling, and security considerations.
---

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

- **JWKS fetching** — fetch JSON Web Key Set:

```typescript
async function fetchJwks(url: string): Promise<any> {
  const response = await fetch(url)
  const jwks = await response.json()

  return function jwtVerify getKey(header: any, callback: any) {
    const key = jwks.keys.find(
      (k: any) => k.kid === header.kid
    )

    if (!key) {
      return callback(new Error('Key not found'))
    }

    const publicKey = jwkToPem(key)
    callback(null, publicKey)
  }
}
```

---

## 4. Claims Handling

- **Standard claims** — handle standard OIDC claims:

```typescript
interface IdTokenClaims {
  iss: string        // Issuer
  sub: string        // Subject (user ID)
  aud: string[]      // Audience
  exp: number        // Expiration time
  iat: number        // Issued at
  auth_time: number  // Authentication time
  nonce: string      // Nonce
  acr: string        // Authentication context class reference
  amr: string[]      // Authentication methods references
  azp: string        // Authorized party
  at_hash: string    // Access token hash
  c_hash: string     // Code hash
  email: string      // Email
  email_verified: boolean
  name: string       // Full name
  given_name: string
  family_name: string
  middle_name: string
  nickname: string
  preferred_username: string
  profile: string
  picture: string
  website: string
  gender: string
  birthdate: string
  zoneinfo: string
  locale: string
  phone_number: string
  phone_number_verified: boolean
  address: {
    formatted: string
    street_address: string
    locality: string
    region: string
    postal_code: string
    country: string
  }
  updated_at: number
}
```

- **Custom claims** — handle custom claims:

```typescript
interface CustomClaims {
  // Custom claims specific to your application
  roles: string[]
  permissions: string[]
  organization: string
  tenant_id: string
}
```

- **Claims mapping** — map OIDC claims to user model:

```typescript
function mapClaimsToUser(claims: IdTokenClaims & CustomClaims): User {
  return {
    id: claims.sub,
    email: claims.email,
    emailVerified: claims.email_verified,
    name: claims.name,
    givenName: claims.given_name,
    familyName: claims.family_name,
    picture: claims.picture,
    roles: claims.roles || [],
    permissions: claims.permissions || [],
    organization: claims.organization,
    tenantId: claims.tenant_id
  }
}
```

---

## 5. UserInfo Endpoint

- **UserInfo request** — request additional user information:

```typescript
async function getUserInfo(accessToken: string): Promise<UserInfo> {
  const response = await fetch('https://auth.example.com/userinfo', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  return response.json()
}
```

- **UserInfo claims** — handle UserInfo response:

```typescript
interface UserInfo {
  sub: string
  name: string
  given_name: string
  family_name: string
  middle_name: string
  nickname: string
  preferred_username: string
  profile: string
  picture: string
  website: string
  email: string
  email_verified: boolean
  gender: string
  birthdate: string
  zoneinfo: string
  locale: string
  phone_number: string
  phone_number_verified: boolean
  address: {
    formatted: string
    street_address: string
    locality: string
    region: string
    postal_code: string
    country: string
  }
  updated_at: number
}
```

---

## 6. Discovery

- **Discovery document** — fetch OIDC provider configuration:

```typescript
interface DiscoveryDocument {
  issuer: string
  authorization_endpoint: string
  token_endpoint: string
  jwks_uri: string
  userinfo_endpoint: string
  revocation_endpoint: string
  introspection_endpoint: string
  response_types_supported: string[]
  subject_types_supported: string[]
  id_token_signing_alg_values_supported: string[]
  scopes_supported: string[]
  token_endpoint_auth_methods_supported: string[]
  claims_supported: string[]
  grant_types_supported: string[]
}

async function fetchDiscoveryDocument(issuer: string): Promise<DiscoveryDocument> {
  const response = await fetch(`${issuer}/.well-known/openid-configuration`)
  return response.json()
}
```

- **Dynamic client registration** — register client dynamically:

```typescript
async function registerClient(registrationUrl: string, clientMetadata: ClientMetadata): Promise<ClientRegistrationResponse> {
  const response = await fetch(registrationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clientMetadata)
  })

  return response.json()
}
```

---

## 7. Session Management

- **Session creation** — create session after authentication:

```typescript
async function createSession(idToken: string, accessToken: string): Promise<Session> {
  const claims = await validateIdToken(idToken, nonce)
  const user = mapClaimsToUser(claims)

  const session = {
    id: generateSessionId(),
    userId: user.id,
    user: user,
    accessToken: accessToken,
    idToken: idToken,
    expiresAt: new Date(claims.exp * 1000),
    createdAt: new Date()
  }

  await sessionStore.save(session)
  return session
}
```

- **Session validation** — validate session on requests:

```typescript
async function validateSession(sessionId: string): Promise<Session> {
  const session = await sessionStore.findById(sessionId)

  if (!session) {
    throw new Error('Session not found')
  }

  if (session.expiresAt < new Date()) {
    await sessionStore.delete(sessionId)
    throw new Error('Session expired')
  }

  return session
}
```

---

## 8. Logout

- **RP-Initiated Logout** — initiate logout from relying party:

```typescript
function initiateLogout(session: Session): string {
  const logoutUrl = `https://auth.example.com/logout?` +
    `post_logout_redirect_uri=${encodeURIComponent(logoutRedirectUri)}&` +
    `id_token_hint=${session.idToken}`

  return logoutUrl
}
```

- **Back-Channel Logout** — implement back-channel logout:

```typescript
async function handleBackChannelLogout(logoutToken: string): Promise<void> {
  const claims = jwt.verify(logoutToken, jwks) as JwtPayload

  // Find sessions for this subject
  const sessions = await sessionStore.findByUserId(claims.sub)

  // Revoke all sessions
  for (const session of sessions) {
    await sessionStore.delete(session.id)
  }
}
```

---

## 9. Security Best Practices

- **Nonce validation** — always validate nonce:

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

- **State parameter** — use state parameter:

```typescript
function generateState(): string {
  return crypto.randomBytes(32).toString('base64')
}

session.oauthState = generateState()
```

- **HTTPS only** — enforce HTTPS:

```typescript
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return res.status(400).json({ error: 'HTTPS required' })
}
```

---

## 10. Implementation Examples

- **OIDC client implementation** — implement OIDC client:

```typescript
class OidcClient {
  private discoveryDocument: DiscoveryDocument

  constructor(
    private clientId: string,
    private clientSecret: string,
    private issuer: string
  ) {}

  async initialize(): Promise<void> {
    this.discoveryDocument = await fetchDiscoveryDocument(this.issuer)
  }

  getAuthorizationUrl(redirectUri: string): string {
    const state = generateState()
    const nonce = generateNonce()
    const { codeVerifier, codeChallenge } = generatePKCE()

    // Store in session
    this.storeSessionData(state, nonce, codeVerifier)

    return `${this.discoveryDocument.authorization_endpoint}?` +
      `response_type=code&` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent('openid profile email')}&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=S256&` +
      `state=${state}&` +
      `nonce=${nonce}`
  }

  async handleCallback(code: string, state: string): Promise<Session> {
    const sessionData = this.getSessionData(state)

    const tokenResponse = await this.exchangeCodeForTokens(code)
    const claims = await this.validateIdToken(tokenResponse.id_token, sessionData.nonce)

    return await this.createSession(claims, tokenResponse.access_token)
  }

  private async exchangeCodeForTokens(code: string): Promise<TokenResponse> {
    const response = await fetch(this.discoveryDocument.token_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        client_secret: this.clientSecret
      })
    })

    return response.json()
  }

  private async validateIdToken(idToken: string, nonce: string): Promise<JwtPayload> {
    const jwks = await fetchJwks(this.discoveryDocument.jwks_uri)

    return jwt.verify(idToken, jwks, {
      algorithms: ['RS256'],
      issuer: this.discoveryDocument.issuer,
      audience: this.clientId
    }) as JwtPayload
  }
}
```

---

## 11. Testing

- **OIDC flow testing** — test OIDC flow:

```typescript
describe('OIDC Client', () => {
  it('should generate valid authorization URL', async () => {
    const client = new OidcClient('client-id', 'client-secret', 'https://auth.example.com')
    await client.initialize()

    const authUrl = client.getAuthorizationUrl('https://app.example.com/callback')

    expect(authUrl).toContain('response_type=code')
    expect(authUrl).toContain('scope=openid')
    expect(authUrl).toContain('nonce=')
    expect(authUrl).toContain('state=')
  })

  it('should validate ID token', async () => {
    const client = new OidcClient('client-id', 'client-secret', 'https://auth.example.com')
    await client.initialize()

    const claims = await client.validateIdToken(idToken, nonce)

    expect(claims.iss).toBe('https://auth.example.com')
    expect(claims.aud).toBe('client-id')
  })
})
```

---

## 12. General Rules of Thumb

- **Authorization Code Flow** — use authorization code flow
- **PKCE** — use PKCE for public clients
- **Nonce validation** — always validate nonce
- **State parameter** — always use state parameter
- **ID token validation** — validate all ID token claims
- **HTTPS** — enforce HTTPS for all OIDC flows
- **Discovery** — use discovery document
- **Logout** — implement proper logout

---

## Quick-Start Checklist

- [ ] Authorization code flow implemented
- [ ] PKCE implemented for public clients
- [ ] Nonce parameter implemented
- [ ] State parameter implemented
- [ ] ID token validation implemented
- [ ] JWKS fetching implemented
- [ ] Claims handling implemented
- [ ] UserInfo endpoint used
- [ ] Discovery document used
- [ ] Logout implemented
