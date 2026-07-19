# Review checklist

Focused reference for **cypress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Structure & CI

- **Specs by user journey** (`login.spec.cy.ts`, `checkout.spec.cy.ts`) mirroring product flows.
- **Run in CI on every push; parallelize specs (`specPattern` shards/`cypress run --parallel`) for speed; record artifacts on failure.**
- **`webServer`/`cypress.config` serves the built app — E2E on the real bundle, not the dev server.**

---

## General Rules of Thumb

- **User-centric selectors; `data-testid` design-in.**
- **Interact then assert; auto-retry does the waiting — no sleeps.**
- **Stub backend / seed via API; fixtures deterministic.**
- **One feature per spec; parallel CI; artifacts on failure.**
- **A suite that's green AND stable is the deliverable.**

---

## Quick-Start Checklist

- [ ] `data-testid`/role-based queries; no CSS-class coupling
- [ ] Intent verbs; `should` auto-retry; no manual `wait()`
- [ ] `cy.intercept` stubs + aliases; fixtures over live backends
- [ ] API-seeded `beforeEach` isolation; per-test resets
- [ ] `cy.clock`/`tick` for time-dependent flows
- [ ] Journey per spec; CI parallel run; failure artifacts captured
