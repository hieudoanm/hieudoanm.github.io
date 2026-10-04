---
name: laravel-backend
description: Best practices for building web applications and APIs with Laravel (PHP). Use when creating, structuring, or reviewing a Laravel app — covers layering, Eloquent discipline, validation, queues, service container, and testing.
---

# Laravel Backend Best Practices

Laravel is a modern PHP framework built on the service container, Eloquent ORM, and a rich set of conventions (routing, middleware, queues, events, policies). Best practice is treating Laravel as **an application framework, not the domain**: thin controllers, Form Request validation, Action/Service classes for business logic, Eloquent used deliberately, queues for non-blocking work, and domain logic kept framework-agnostic where possible.

---

## 1. Core Stack & Constraints

- Laravel **10+**; PHP **8.2+**
- Eloquent ORM (knowing its trade-offs); queues/jobs/events; Horizon for monitoring queues
- Pest or PHPUnit; PHPStan + Larastan for static analysis

```bash
composer create-project laravel/laravel app
```

- **Pin PHP/Laravel explicitly** — `composer.json` constraints + lock file; no surprise framework upgrades.
- **Use Laravel conventions first** — directories, naming, and scaffolded structure keep the app self-documenting.

---

## 2. MVC & Layering

- **Thin controllers, fat domain/services** — controllers orchestrate HTTP only: Validate → dispatch Action → respond.
- **Form Requests for validation** — request objects carry validation + authorization:

```php
class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:200'],
            'email' => ['required', 'email'],
        ];
    }
}
```

- **Action or Service classes for business logic** — single-purpose classes over god controllers:

```php
class CreateUser
{
    public function __invoke(StoreUserRequest $request): User
    {
        return DB::transaction(fn () => User::create($request->validated()));
    }
}
```

- **Models own relationships, scopes, casts, and invariants** — not every workflow (avoid fat models).
- **Explicit boundaries:**
  - HTTP (Controllers, Requests)
  - Application (Actions, Services)
  - Domain (Models, Value Objects)
  - Infrastructure (DB, Cache, External APIs)

---

## 3. Eloquent Discipline

- **Use Eloquent deliberately, not everywhere** — accept Read/Write trade-offs; raw SQL where queries get complex or hot.
- **Avoid magic attributes without casts** — always `$casts` for typed values; no implicit type juggling:

```php
protected $casts = [
    'is_active' => 'boolean',
    'settings'  => 'array',
];
```

- **Avoid N+1** — eager load with `with()`/`load()` deliberately:

```php
$users = User::query()->with(['posts' => fn ($q) => $q->where('published', true)])->get();
```

- **Lazy vs eager loading** understood per request — measure and load once.
- **Explicit state via enums** (PHP 8.1 `enum`) — no stringly-typed statuses scattered across models.
- **Use database transactions explicitly** for multi-step writes (`DB::transaction`).

---

## 4. Validation

- **Validate input early via Form Requests** — authorization + rules colocated with the request.

```php
public function rules(): array
{
    return [
        'email'   => ['required', 'email', Rule::unique('users')],
        'role'    => ['required', Rule::enum(Role::class)],
    ];
}
```

- **Fail fast on invalid input** — Laravel's validation redirects/422s before business logic runs.
- **Never trust client input** — validate every request boundary (including query params and route params where relevant).
- Combine `$request->validated()` with Actions so services receive only trusted data.

---

## 5. Service Container & DI

- **Prefer dependency injection over facades in domain logic** — facades are fine at HTTP/edge layers; inject for testability:

```php
class ReportService
{
    public function __construct(private readonly UserRepository $users) {}
}
```

- **Avoid overusing facades in domain logic** and global helpers outside edges — resolve dependencies explicitly.
- **Bind interfaces in providers** (`AppServiceProvider`) — swap implementations in tests.
- Keep container wiring at the composition root; domain code stays plain classes.

---

## 6. Queues, Jobs & Events

- **Use queues for non-blocking work** — emails, webhooks, batch export: `dispatch(new SendWelcomeEmail(...))`:

```php
class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public User $user) {}

    public function handle(): void { Mail::to($this->user)->send(new WelcomeMail($this->user)); }
}
```

- **Pass IDs or serializable primitives; remember queue serialization** — jobs are rehydrated in the worker.
- **Monitor with Horizon** for queue health; retry/idempotency-aware jobs.
- **Events/l listeners to decouple workflows** — dispatch domain events, listeners react; don't chain side effects inside controllers.

---

## 7. Policies & Authorization

- **Policies over inline authorization** — `@can('update', $post)` / `$this->authorize('update', $post)`; policy methods per action:

```php
class PostPolicy
{
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id || $user->is_admin;
    }
}
```

- **Restrict via controllers/requests** — `authorizeResource` and policy checks before mutation.
- **Never trust client input; enforce at the policy, not the view.**

---

## 8. Performance, Memory & Safety

- **Be mindful of N+1, lazy/eager loading, and queue serialization** — measure before optimizing.
- **Use caching intentionally** — Cache facade/Redis with TTLs for hot queries:

```php
$metrics = Cache::remember('dashboard.metrics', 300, fn () => $this->compute());
```

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