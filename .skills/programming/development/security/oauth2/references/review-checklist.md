# Review checklist

Focused reference for **oauth2-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
