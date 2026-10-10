# Implementation notes

Focused reference for **oidc-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
