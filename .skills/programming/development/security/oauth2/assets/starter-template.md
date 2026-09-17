# OAuth 2.0 Best Practices: Starter Template

A reusable starting point derived from the **8. Implementation Examples** section of [OAuth 2.0 Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
