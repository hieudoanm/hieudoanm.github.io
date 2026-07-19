# Review checklist

Focused reference for **better-auth-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Security & Operations

- **Rate-limit auth endpoints; CSRF-safe cookie flows (library default) verified for the framework.**
- **Secrets rotated; `AUTH_SECRET`/`BETTER_AUTH_SECRET` not committed.**
- **Lighthouse: multi-tenant/SSRF-sensitive flows — trust boundaries documented.**
- **Tests: integration against the pinned version; CI key rotation drill.**

---

## General Rules of Thumb

- **One typed instance; plugins reflect real flows.**
- **Adapter + schema migrated; parity across engines documented.**
- **Sessions via cookies; middleware guards at the boundary.**
- **Client typed (`createAuthClient`); SSR cookie forwarding correct.**
- **Rate limits + secret hygiene + CSRF verified.**

---

## Quick-Start Checklist

- [ ] Central `betterAuth()` instance; plugins minimal; secrets env-only
- [ ] Adapter schema applied; data migrations committed
- [ ] Cookie/session options deliberate; revocation on logout
- [ ] Route handler wired; framework middleware guards pages
- [ ] `createAuthClient` typed; SSR cookie forwarding checked
- [ ] Rate limits on auth; secret rotation; CI integration tests
