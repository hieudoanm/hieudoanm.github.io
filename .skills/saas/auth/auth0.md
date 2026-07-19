---
name: auth0
description: Best practices for integrating Auth0 into a backend. Use when adding authentication, configuring OIDC/OAuth2 clients, tenancy, or user management — covers token validation, MFA, rate limiting, and secure storage.
---

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

---

## 2. Integration & Token Handling

- **Validate access tokens on every protected request** — signature, issuer, audience, expiry
- **Never send the ID token to your API** to carry authorization; use the access token and its claims/scopes
- **Treat the access token as untrusted input** — do not accept opaque tokens you cannot verify
- **Rotate signing keys** (`RS256` + JWKS) rather than pinning a static public key
- Use **PKCE for all public clients**; `client_secret` only where it can be stored securely (server-side)

---

## 3. Security

- **Enable MFA** for production users; enforce for elevated roles
- **Enable brute-force protection and bot detection** for the login endpoints
- **Rate-limit your own token/authorization endpoints** — Auth0 rate limits apply per tenant
- **Never log tokens or secrets**; store refresh tokens server-side, not in localStorage
- **Apply least-privilege to M2M clients** — scoped clients, no wildcard grants
- Use **custom claims/sponsors** to carry authorization data only after defining the contract

---

## 4. Reliability & Operations

- Handle **JWKS fetch caching** (keys rotate); fall back to re-fetch on `kid` unknown
- **Gracefully handle auth outages** — token validation is local; only login/refresh needs the provider
- Monitor:
  - **failed logins** and rate-limit rejections
  - **signing-key caching errors**
  - **MFA/brute-force events**
- Store tenant/config in env; use dedicated tenants for prod vs dev

---

## 5. General Rules of Thumb

- **Validate tokens locally, never per-request network calls to Auth0**
- **Trust the token, not the browser** — authorization is server-enforced
- **MFA on, brute-force on, least-privilege scopes** — the production defaults
- **Keep client secrets server-side**; public clients always use PKCE

---

## Quick-Start Checklist

- [ ] OIDC/OAuth2 flows chosen correctly (PKCE for public clients, M2M for services)
- [ ] Access tokens validated locally via JWKS — signature, issuer, audience, expiry
- [ ] Client secrets server-side only; no secrets in the browser
- [ ] MFA enforced; brute-force/bot protection enabled
- [ ] Least-privilege scopes for API/M2M clients
- [ ] JWKS cached with re-fetch on rotation; no token/secret logging
- [ ] Rate limits understood; auth outage handled gracefully
- [ ] Prod vs dev tenants separated; security events monitored