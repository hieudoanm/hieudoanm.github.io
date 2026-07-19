# OpenID Connect Best Practices: 11. Testing

## Source guidance

This example applies the **11. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **OIDC flow testing** — test OIDC flow:

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for oidc-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
