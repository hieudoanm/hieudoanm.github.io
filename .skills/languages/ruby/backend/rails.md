---
name: rails-backend
description: Best practices for building web applications and APIs with Ruby on Rails. Use when creating, structuring, or reviewing a Rails app — covers MVC boundaries, Active Record discipline, services, background jobs, performance, and testing.
---

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

```ruby
class CreateUser
  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
  end

  def call
    user.transaction do
      user.save!
      invite_email.deliver_later
    end
    user
  end
end
```

- **Policies over inline authorization** — `Pundit::Policy`/explicit policy objects rather than `if user.admin?` scattered in controllers.
- **Use events or notifications to decouple flows** — `ActiveSupport::Notifications`, or Rails 7.1+ framework notifications for cross-cutting concerns.
- **Avoid anemic models _and_ god models** — find the right split between persistence shell and fat object; extract values/workflows to POROs.

---

## 4. Organizing Beyond `app/models`

- **Not everything in `app/models`** — when complexity grows, organize by feature/domain:

```text
app/
  controllers/
  models/
  services/          # PORO workflows
  policies/
  jobs/
  mailers/
  domain/            # feature-scoped objects when warranted
```

- **Rails is an application framework, not the domain** — the domain logic should survive outside Rails if ever needed; keep framework calls at the edges.
- Let conventions carry the simple case; extract structure deliberately, not early.

---

## 5. Active Record Discipline

- **Eager-load deliberately; avoid N+1** — `includes`/`preload` balanced against query size:

```ruby
users = User.where(active: true).includes(:posts)
```

- **Know eager vs lazy loading** — default understanding of when AR loads collections and why.
- **Freeze constants where appropriate** — configuration arrays/hashes `freeze`d or via `config`.
- **Explicit unified transactions** — `Model.transaction` for multi-step writes, not implicit saves:

```ruby
Order.transaction do
  order.save!
  payment.record!
end
```

- **Avoid over-reliance on magic** — explicit validations, explicit DB calls; `reload`/`touch` used knowingly.
- **Model state via enums with explicit casts** — no stringly-typed booleans scattering.

---

## 6. Performance, Memory & Safety

- **Be mindful of N+1, eager/lazy loading, and object allocations** in request paths — measure before optimizing.
- **Use caching intentionally** — fragment caching, low-level caching (`Rails.cache.fetch`) over re-computation:

```ruby
Rails.cache.fetch("users/#{id}/profile", expires_in: 10.minutes) do
  expensive_serialization(user)
end
```

- **Avoid premature optimization** — clarity first, cache/profile only where data shows need.
- **Validate input early** — strong parameters + model validations; `permit` at the controller boundary.
- **Escape output appropriately** — ERB auto-escapes; be deliberate in JSON/API responses and `raw`.
- **Freeze constants; avoid allocation in hot loops.**

---

## 7. Background Jobs & Async

- **Jobs for async work** (`Active Job` → Sidekiq) — emails, webhooks, batch processing; never blocking in request lifecycle:

```ruby
class SendWelcomeEmailJob < ApplicationJob
  queue_as :default
  def perform(user_id)
    UserMailer.welcome(User.find(user_id)).deliver_now
  end
end
```

- **Pass IDs not objects** to jobs — job arguments must be simple, serializable values.
- **Idempotency-aware jobs** where retries are expected (Sidekiq retries).
- **Keep request responses fast** — long work goes to jobs/queues, not the web process.

---

## 8. Reliability, Testing & Portability

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