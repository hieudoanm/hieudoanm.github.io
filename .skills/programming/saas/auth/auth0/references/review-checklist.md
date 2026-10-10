# Review checklist

Focused reference for **auth0**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
