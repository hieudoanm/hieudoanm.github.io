# Overview

Focused reference for **laravel-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
