# Implementation notes

Focused reference for **zitadel**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Security & Operations

- **Enable MFA and passwordless** (passkeys) per policy; enforce for admins
- **Brute-force protection and lockout policies** configured
- Secure the **admin (console/API)** surface; least-privilege machine users
- **Backups and HA** are part of operations — event-sourced store still needs consistent backups
- Monitor:
  - **login failures/lockouts**
  - **JWKS/key rotation errors**
  - **token validation failures falling back to network**
- Keep **instances and orgs** cleanly separated to match your tenancy model

---

## 5. General Rules of Thumb

- **Instances/orgs/projects are the isolation model** — design tenancy around grants, not hacks
- **Let ZITADEL own the sign-in UX; you own authz from claims**
- **Local validation + cached JWKS** — services shouldn't hit the IdP per request
- **Machine users and humans are distinct** — use the right flow for each
