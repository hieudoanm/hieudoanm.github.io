# Review checklist

Focused reference for **rails-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Test pyramid:**
  - Unit tests for POROs
  - Model tests for invariants
  - Request/system tests for flows
- **Avoid brittle controller-only tests** — test behavior through requests/feature tests.
- **Use factories intentionally** (FactoryBot) — consistent fixtures, deliberate creates; avoid test-only setup drift.
- **Deterministic tests over heavy mocking** — real DB where invariants matter; stubs for external services.
- **Structured logging and error reporting** — Rails log tags, `Rails.logger` structured entries, error reporters (Sentry etc.).
- **Configuration via environment variables** — `ENV`-driven config, `credentials` for secrets.

---

## 9. Security

- **Strong parameters** first — `params.require(:user).permit(...)` at the boundary; never `params` wholesale.
- **Authorization via policies**, not inline controller checks.
- **Never trust client input** — validate at the model, sanitize at the edge, escape on output.
- **Secrets via `credentials`/env** — never hardcode; never commit.
- **Protect against mass assignment** with strong params; be explicit about permitted attributes.

---

## 10. General Rules of Thumb

- **Rails is the framework; the domain lives in services/POROs** — a workflow should be readable and testable independent of the request cycle.
- **Skinny controllers, invariant-owning models, service classes for flows** — the Rails sweet spot.
- **Callbacks for persistence-coupling only** — side-effectful callbacks are a debugging trap; prefer explicit services.
- **Measure before optimizing**; cache intentionally; know your N+1s.
- **Test the behavior, not the Rails plumbing** — request tests, model invariants, PORO units.

---

## Quick-Start Checklist

- [ ] Skinny controllers; models own persistence + invariants; POROs for workflows
- [ ] Service objects over fat models; policies over inline authorization
- [ ] Callback-light models (persistence-coupling only); concerns used sparingly
- [ ] Feature/domain organization as complexity grows (not everything in `app/models`)
- [ ] `includes`/`preload` against N+1; eager/lazy loading known; explicit `transaction`
- [ ] Caching intentional (fragment/low-level); no premature optimization
- [ ] Jobs get IDs, not objects; idempotent workers; async work off the request path
- [ ] Strong parameters; policy-based authZ; secrets via credentials/env
- [ ] Test pyramid: PORO units, model invariants, request flows; deterministic
- [ ] Structured logging; env-driven config; domain portable outside Rails
