# Review checklist

Focused reference for **laravel-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Avoid premature optimization** — clarity first, cache where data shows need.
- **Prefer readonly value objects where possible** (PHP 8.1+ `readonly`).
- **Escape output appropriately** — Blade auto-escapes; be deliberate with `{!! !!}` and API JSON.
- **Config via environment variables** — `.env`/config files; never hardcode secrets.

---

## 9. Reliability, Testing & Portability

- **Test pyramid:**
  - Unit tests for domain logic
  - Feature tests for HTTP flows
- **Avoid over-mocking Eloquent** — test against a real test DB where invariants matter; stub only external services.
- **Use database factories intentionally** — `User::factory()->create()` in tests, seed data deliberately.
- **Deterministic tests over brittle mocks** — refresh database between tests (`RefreshDatabase`).
- **Portable across FPM, CLI (Artisan), and queues/workers** — domain/services work in all entrypoints.
- **Structured logging & exception handling** — Laravel logging channels; exception reporters; API error shapes centralized.

---

## 10. Security

- **Validation at every boundary** (Form Requests); **policies for authorization** — not inline checks.
- **Never trust client input** — `request()->validated()` to services; mass assignment protected.
- **Avoid dumping exception details** in API/Blade responses — map to generic messages, log the cause.
- **Secrets via env/`.env`** (config files reference env); never committed, never hardcoded.

---

## 11. General Rules of Thumb

- **Laravel is the framework, services are the domain** — Actions/Services carry workflows; models carry data + invariants; controllers stay thin.
- **Form Requests own validation**; **policies own authorization** — Laravel's declarative edge.
- **Eloquent deliberately** — casts, eager loading against N+1, transactions for writes, enums for state.
- **Queues for async, not the web process** — non-blocking by default.
- **Test behavior, not framework plumbing** — feature + unit pyramid, deterministic.

---

## Quick-Start Checklist

- [ ] Laravel 10+/PHP 8.2+ pinned; conventions-first layout
- [ ] Thin controllers → Form Requests (validation) → Action/Service classes → respond
- [ ] Eloquent used deliberately: `$casts`, eager loading against N+1, explicit `DB::transaction`
- [ ] State via enums/readonly value objects; no magic strings/attributes without casts
- [ ] Queue jobs for async work (IDs/payloads, idempotent), Horizon monitoring
- [ ] Policies over inline authorization; `authorize`/`@can` at the edge
- [ ] DI over facades in domain logic; container wiring at the composition root
- [ ] Caching intentional (`Cache::remember`); no premature optimization
- [ ] Feature + unit test pyramid; factories + `RefreshDatabase`; deterministic
- [ ] Secrets via env; structured logging; no leaked exceptions in responses
