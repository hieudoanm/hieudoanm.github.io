# OpenID Connect Best Practices: Starter Template

A reusable starting point derived from the **10. Implementation Examples** section of [OpenID Connect Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
