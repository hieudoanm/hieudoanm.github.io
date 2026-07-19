# Review checklist

Focused reference for **keycloak**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Keycloak is a platform service** — external DB, HA nodes, rehearsed restore
- **Realms isolate; clients least-privilege** — the configuration discipline
- **Validate locally, authorize from claims** — your services don't ping Keycloak per request
- **Upgrades are planned migrations, not piped operations**

---

## Quick-Start Checklist

- [ ] External PostgreSQL configured with backups; no Dev mode in prod
- [ ] Multiple nodes + LB for HA; `KC_HOSTNAME` and TLS configured
- [ ] Realms isolated per environment/tenant
- [ ] Clients least-privilege, minimal redirect URIs, PKCE for public clients
- [ ] MFA/OTP + brute-force protection enabled per realm
- [ ] Tokens validated locally (JWKS cached); issuer/audience checked
- [ ] No token/secret logging; admin access protected and audited
- [ ] Upgrade rehearsed in staging; rollback plan ready; metrics monitored
