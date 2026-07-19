# Review checklist

Focused reference for **okta**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Quick-Start Checklist

- [ ] OIDC/SAML chosen to match IdP + app needs; audiences configured per API
- [ ] Tokens validated locally (RS256 + JWKS) — `iss`/`aud`/`exp` checked
- [ ] Authorization via group claims; no client-supplied authorization headers
- [ ] PKCE for public clients; client_credentials for M2M
- [ ] MFA/adaptive policies enabled; brute-force protection on
- [ ] SCIM/lifecycle integration configured; deactivation semantics honored
- [ ] JWKS cached; key rotation handled; SSO outages rehearsed
- [ ] No token/secret logging; least-privilege scopes; prod vs dev orgs separated
