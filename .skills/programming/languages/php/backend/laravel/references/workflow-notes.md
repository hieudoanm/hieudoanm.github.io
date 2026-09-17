# Workflow notes

Focused reference for **laravel-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
