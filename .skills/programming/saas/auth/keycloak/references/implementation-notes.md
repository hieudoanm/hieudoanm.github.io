# Implementation notes

Focused reference for **keycloak**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Token & Integration Security

- **Validate access tokens locally** (RS256 + JWKS), checking `iss`/`aud`/`exp` — avoid per-request calls to Keycloak
- **Cache JWKS** and handle key rotation (re-fetch on unknown `kid`)
- Use **claims** (roles, groups, `aud`) for authorization — don't trust client-sent headers
- **Never store or log tokens**; keep refresh tokens server-side
- Protect the **Admin API** and admin account with strong auth; rotate admin credentials

---

## 5. Upgrades & Operations

- **Upgrades are significant events** — read the release upgrade notes; breaking changes are common between majors
- Test upgrades in a staging realm/database first
- **Back up the database + secrets** before upgrades; have a rollback plan
- Monitor:
  - **DB health and connection count**
  - **login failures / brute-force lockouts**
  - **token signing key rotation errors**
  - **JVM heap / GC** on nodes
- Pin versions; avoid running `start-dev` anywhere near production
