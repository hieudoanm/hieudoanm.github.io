# Implementation notes

Focused reference for **oauth2-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Scope Management

- **Request minimal scopes** — request only necessary scopes:

```typescript
// Good - minimal scopes
const scope = 'read:profile'

// Bad - excessive scopes
const scope = 'read:profile write:profile read:email write:email read:contacts'
```

- **Scope validation** — validate scopes on resource server:

```typescript
function validateScopes(requiredScopes: string[], userScopes: string[]): boolean {
  return requiredScopes.every(scope => userScopes.includes(scope))
}

// In middleware
if (!validateScopes(['read:profile'], req.user.scopes)) {
  return res.status(403).json({ error: 'Insufficient scopes' })
}
```

---

## 6. Client Registration

- **Client types** — register appropriate client types:

```typescript
// Confidential client (server-side)
const confidentialClient = {
  client_id: 'confidential-client',
  client_secret: 'secret',
  redirect_uris: ['https://app.example.com/callback'],
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code']
}

// Public client (SPA, mobile)
const publicClient = {
  client_id: 'public-client',
  redirect_uris: ['https://app.example.com/callback'],
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  token_endpoint_auth_method: 'none' // No client secret
}
```

- **Redirect URI validation** — validate redirect URIs:

```typescript
function validateRedirectUri(redirectUri: string): boolean {
  const allowedUris = [
    'https://app.example.com/callback',
    'https://app.example.com/auth/callback'
  ]

  return allowedUris.includes(redirectUri)
}
```

---

## 7. Error Handling

- **Error responses** — handle OAuth errors properly:

```typescript
function handleOAuthError(error: OAuthError): void {
  switch (error.error) {
    case 'invalid_request':
      // Request is missing required parameters
      break
    case 'unauthorized_client':
      // Client is not authorized to use this grant type
      break
    case 'access_denied':
      // Resource owner denied the request
      break
    case 'unsupported_response_type':
      // Authorization server does not support response type
      break
    case 'invalid_scope':
      // Requested scope is invalid
      break
    case 'server_error':
      // Authorization server encountered an error
      break
    case 'temporarily_unavailable':
      // Authorization server is temporarily unavailable
      break
    default:
      // Unknown error
  }
}
```
