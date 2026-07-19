# OAuth 2.0 Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **OAuth flow testing** — test OAuth flow:

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for oauth2-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
