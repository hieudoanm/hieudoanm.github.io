# Workflow notes

Focused reference for **oauth2-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
