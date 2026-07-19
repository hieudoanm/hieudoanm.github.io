# Implementation notes

Focused reference for **auth0**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
