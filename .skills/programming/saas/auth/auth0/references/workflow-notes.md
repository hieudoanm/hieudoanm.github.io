# Workflow notes

Focused reference for **auth0**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
