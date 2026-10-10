# Overview

Focused reference for **rails-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Rails Backend Best Practices

Rails is a mature, convention-heavy application framework: convention over configuration, MVC, Active Record, and integration-tested workflow primitives like jobs, mailers, and storage. Best practice is treating Rails as **an application framework, not the domain** — controllers orchestrate HTTP, models own persistence and invariants, services/Plain-Ruby-Objects own workflows, and domain logic would survive outside Rails if needed.

---

## 1. Core Stack & Constraints

- Ruby **3.2+**; Rails **7+**
- Active Record for persistence (knowing its trade-offs); Sidekiq/Active Job for background work
- RSpec or Minitest; RuboCop (+ Sorbet/Steep for gradual typing if adopted)
- Action Cable, Action Mailer, Active Storage as needed

```bash
rails new app --api        # for API-only backends: --api
```

- **Pin Ruby/Rails explicitly** — Ruby version managers (`.ruby-version`) and `Gemfile` locks; no surprise upgrades.
- **Use Rails conventions first** — file locations, generators, and naming conventions make the framework self-documenting.

---

## 2. MVC Boundaries

- **Skinny controllers** — HTTP orchestration only: params → validation → service/job → respond.
- **Models own persistence + invariants** — validations, scopes, associations, and domain invariants.
- **Plain Ruby objects (POROs) for business workflows** — service objects/interactors for non-trivial flows.
- **Avoid business logic in views** — helpers present, they don't decide.
- **Avoid callback-heavy models** — prefer explicit service calls or `after_commit` semantics over chains of `before_save`/`after_create` with side effects.
- **Use concerns sparingly** — a concern with one use site is just an include; prefer extracted classes.

---

## 3. Architecture & Design Rates

- **Explicit boundaries:**
  - Controllers (HTTP)
  - Models (persistence & invariants)
  - Services/Interactors (workflows)
  - Jobs (async work)
- **Service objects over fat models** — when a workflow touches multiple models or has many steps, put it in a service object:
