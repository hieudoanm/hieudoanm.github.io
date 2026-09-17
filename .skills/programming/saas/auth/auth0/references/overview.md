# Overview

Focused reference for **auth0**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Auth0 Best Practices

Auth0 is a hosted identity platform (OIDC/OAuth2) providing login, MFA, and user management. Best practice is treating it as a **trust boundary**: validate tokens locally (JWKS), never trust the browser, keep secrets server-side, and enable MFA and brute-force protection for production tenants.

---

## 1. Core Stack & Concepts

- **OIDC/OAuth2**: use the standardized flows (`authorization_code` + PKCE for SPAs/native, `client_credentials` for machine-to-machine)
- **Tenants** isolate environments (dev/prod); **organizations** group users
- Tokens: **ID token** (identity claims), **access token** (API authorization, validation is caller's job)
- **JWKS endpoint** for local signature verification

```ts
// verify RS256 JWT locally, not over HTTP per request
const { payload } = jwt.verify(token, getSigningKey(jwks, header.kid), {
  audience: "https://api.example.com",
  issuer: "https://your-tenant.auth0.com/",
});
```
