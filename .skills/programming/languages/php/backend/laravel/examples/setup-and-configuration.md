# Laravel Backend Best Practices: 2. MVC & Layering

## Source guidance

This example applies the **2. MVC & Layering** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Thin controllers, fat domain/services** — controllers orchestrate HTTP only: Validate → dispatch Action → respond.
- **Form Requests for validation** — request objects carry validation + authorization:
- **Action or Service classes for business logic** — single-purpose classes over god controllers:
- **Models own relationships, scopes, casts, and invariants** — not every workflow (avoid fat models).
- **Explicit boundaries:**
- HTTP (Controllers, Requests)
- Application (Actions, Services)

## Example

```php
class CreateUser
{
    public function __invoke(StoreUserRequest $request): User
    {
        return DB::transaction(fn () => User::create($request->validated()));
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for laravel-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
