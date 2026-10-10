# Review checklist

Focused reference for **oidc-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
