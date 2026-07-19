# Implementation notes

Focused reference for **rails-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
