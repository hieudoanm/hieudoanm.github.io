# Review checklist

Focused reference for **zitadel**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Quick-Start Checklist

- [ ] Instance/org/project/grants modeled to match your tenancy
- [ ] OIDC flows correct: PKCE public clients, `client_credentials` M2M
- [ ] Access tokens validated locally (JWKS cached) — `iss`/`aud`/`exp`
- [ ] Authorization from claims/grants; no client-supplied headers
- [ ] MFA/passwordless + lockout policies enabled; admin access secured
- [ ] No token/secret logging; refresh tokens server-side
- [ ] Backups + HA planned; key rotation and failures monitored
- [ ] Staging/prod instances separated; upgrades rehearsed
