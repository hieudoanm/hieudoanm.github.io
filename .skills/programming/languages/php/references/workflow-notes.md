# Workflow notes

Focused reference for **php-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`null` is a state to model, not a bug to dodge** — use `?` when a value may genuinely be absent; don't mask with empty strings.

---

## 3. Error Handling

- **Exceptions for failures; typed exceptions per domain** (`NotFoundException`, `ValidationException`):

```php
try {
    $user = $repo->findOrFail($id);
} catch (NotFoundException $e) {
    throw new HttpNotFoundException($e->getMessage(), previous: $e);
}
```

- **`throw` specific types; catch narrowly** — a broad `catch (\Exception $e)` in the business layer is a code smell; `catch (\Throwable)` only at the true boundary.
- **Don't rethrow by convention — extend and wrap with `previous:`** to preserve stack context.
- **`finally` for deterministic cleanup; never swallow catches.**
- **Fail fast on invalid input at the boundary** — validate HTTP/database input before business logic mutates state.

---

## 4. Classes, Inheritance & Design

- **`final` classes by default; interfaces for polymorphism** — a class not meant to be extended says so with `final`:

```php
interface UserRepository
{
    public function find(int $id): ?User;
}
```

- **Program to interfaces at seams** — constructor injection, no static service locators:

```php
final class UsersService
{
    public function __construct(private readonly UserRepository $repo) {}
}
```

- **Single responsibility per class; keep method bodies small** — a method over ~30 lines or a class over ~300 is a refactor candidate.
- **Value objects over stringly primitives** — `Email`, `UserId`, `Money` with invariants at construction.
- **`strategy`/`command`/`repository` patterns over god-classes; readonly DTOs for data transport.**

---

## 5. PSR Conventions

- **PSR-12 coding style enforced by tooling** (`php-cs-fixer`/`phpcs`), not by memory:

```bash
vendor/bin/php-cs-fixer fix --dry-run --diff
```
