# Review checklist

Focused reference for **auth-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Security Hygiene

- **`AUTH_SECRET`/`secret` long, rotated; provider secrets never in client bundles.**
- **CSRF/`callbackUrl` handling sanctioned (NextAuth handles most — verify redirect sanity).**
- **Rate-limit the credential path; lockout on brute-force via stored throttling.**
- **Audit dependency upgrades (`@auth/*` versioning reviewed); logs redact PII.**

---

## General Rules of Thumb

- **One typed auth config; providers match real flows.**
- **Session strategy deliberate (JWT stateless vs DB durable).**
- **Callbacks attach minimal identity; middleware guards the tree.**
- **Adapters for DB sessions; cleanup scheduled.**
- **Secrets env-only; redirects safe; rate limits on forbids.**

---

## Quick-Start Checklist

- [ ] Auth config centralized; providers declared (OAuth/Credentials) minimal
- [ ] Session strategy chosen + documented (JWT vs DB + adapter)
- [ ] Callbacks minimal identity; no secrets in session
- [ ] Middleware route protection; API auth guards
- [ ] Adapter schema migrated; expired sessions cleaned
- [ ] `AUTH_SECRET` rotated; callbackUrl checked; rate limiting on credentials
