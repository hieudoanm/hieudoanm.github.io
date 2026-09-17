# Review checklist

Focused reference for **beego-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Deployment & Testing

- **Config as env; graceful shutdown; `runmode=prod` with `AutoRender=false` for API mode:**
- **Tests: `httptest`+controller harness; service packages unit-tested; golden-response checks.**
- **Pin versions (`go.mod`); CI pipeline builds + tests + lint; health endpoints for SWR.**

---

## General Rules of Thumb

- **Thin controllers; domain logic in services.**
- **Route verbs explicit; config centralized + env-overridable.**
- **ORM models explicit; transactions for multi-writes.**
- **Filters for cross-cutting; sessions/cache deliberate.**
- **Env-config deploys; tests at the service+controller boundary.**

---

## Quick-Start Checklist

- [ ] `web.Router` with verb mapping; controllers thin
- [ ] `conf/app.conf` typed; secrets env/secret-manager only
- [ ] ORM models + migrations; transaction-scoped multi-writes
- [ ] `InsertFilter` for auth/CORS/ratelimit; recovery+logging wired
- [ ] Session/cache provider deliberate; API mode `AutoRender=false`
- [ ] Service+controller tests; version pinned; CI lint/build/test
