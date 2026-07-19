# OAuth 2.0 Best Practices: Basic Usage

Best practices for implementing OAuth 2.0 for authorization. Use when designing, implementing, or reviewing OAuth 2.0 implementations — covers grant types, token management, security considerations, and integration patterns.

## Scenario

Use this example as a starting point when applying **oauth2-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Grant Types** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
