---
name: php-best-practices
description: Best practices for writing PHP — the language conventions for modern PHP 8 web applications and CLIs. Use when writing, structuring, or reviewing PHP — covers strict types, null safety, error handling, OOP design, PSR conventions, security, and tooling.
---

# PHP Best Practices

Modern PHP (8.x) is a mature, typed language — not the "fast but scary" era of PHP 4. Practical PHP leans on **strict types declared at every file boundary (`declare(strict_types=1)`), typed properties and parameters, first-class exceptions with narrow catches**, and **PSR-12 style as a CI-enforced convention**. Composer is the dependency ecosystem, and static analysis (`phpstan`/`psalm`) is the review gate.

---

## 1. Strict Types & Type Safety

- **`declare(strict_types=1);` at the top of every functional file** — scalar coercion is opt-in, not silent:

```php
<?php
declare(strict_types=1);
```

- **Types on everything a boundary touches** — typed properties, params, returns:

```php
final class User
{
    public function __construct(
        private readonly int $id,
        private string $name,
        private ?string $email = null,
    ) {}
}
```

- **`?Type` for nullable, `null` default; union types (`int|string`) where the domain genuinely mixes; `mixed` only at internal seams.**
- **`readonly`/`final` where mutation/inheritance isn't wanted** — the compiler enforces what comments used to promise.
- **`array` with docblock shape (`@param list<User>`) at API boundaries; `array<int, User>` for the shape contract.**

---

## 2. Null Safety & Defaults

- **`?->` null-safe operator chains** and `??`/`??=` for defaults over verbose null checks:

```php
$city = $user?->address?->city;      // null if any hop is null
$port = $env['PORT'] ?? 8080;
```

- **`match` over `switch` for value dispatch** — strict comparison and expression value:

```php
$statusLabel = match ($status) {
    200, 204 => 'ok',
    404      => 'not found',
    default  => 'error',
};
```

- **Enums instead of stringly statuses** — backed enums carry the value contract and serialize cleanly:

```php
enum Status: string
{
    case Active = 'active';
    case Inactive = 'inactive';
}
```

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

- **Autoloading via PSR-4** — namespace ⇔ directory layout exact (e.g., `App\Domain\...` → `src/Domain/...`).
- **Semantic class/interface names** (`HttpClientInterface`, `UserRepository`) over abbreviation soup.
- **`declare(strict_types=1)` + `strict` ordering conventions consistent across the repo.**
- **Composer scripts for the standard gates** — `composer lint`, `composer test`, `composer analyse`.

---

## 6. Security

- **Treat all input as hostile until validated** — HTTP params, headers, uploaded files, deserialized JSON:

```php
$id = (int) filter_var($_GET['id'] ?? '', FILTER_VALIDATE_INT) ?: null;
```

- **Output escaping is the inversion** — `htmlspecialchars($data, ENT_QUOTES)`, or template-escape layer for view output. Never trust "userland said it's text".
- **SQL via parameterized queries/CDB only** — `PDO::prepare`/bind or an ORM; string interpolation into SQL is the #1 CVE.
- **Passwords: `password_hash`/`password_verify` (bcrypt/argon2) over hand-rolled hashing.**
- **Uploads** — serve from a non-executable location or validate `mime` against an allowlist; never trust extensions.
- **Secrets in env/`.env` only, never in code or committed config.**

---

## 7. Composer & Dependencies

- **`composer.json` declares the contract; `composer.lock` pins it** — commit the lock for apps.
- **Pin major versions with `^` ranges; review `composer audit`/Dependabot for vulnerable packages.**
- **Few, well-vetted dependencies** — PHP packages replace a 50-line custom class only when the maturity tax is worth it.
- **Dev deps in `require-dev`** (PHPUnit, PHPStan, tooling) — never shipped to prod runtime.
- **Autoload `psr-4` optimized in deploy** (`composer install --no-dev --optimize-autoloader`).

---

## 8. Tooling & Static Analysis

- **PHPStan/Psalm at the desired surface level as a CI gate:**

```bash
vendor/bin/phpstan analyse --level=max
```

- **PHP-CS-Fixer (or phpcs) for style; type-level analysis for logic** — both gates, both in CI.
- **`php -l` as the fastest syntax gate** in pre-commit.
- **Xdebug for debugging with an IDE/CI only — never in the prod serialization path.**
- **OPcache enabled in production** — the runtime is fast; the language's warm path is the bytecode cache.

---

## 9. Testing

- **PHPUnit for contracts** — behavior (success, validation, 404, empty, cancellation), not implementation internals:

```php
public function test_find_returns_null_when_missing(): void
{
    $this->assertNull($this->service->find(999));
}
```

- **Data providers for table-driven cases** — input × expected rows, attribute-style `#[DataProvider]`:

```php
#[DataProvider('emailCases')]
public function test_email_validated(string $input, bool $expected): void
{
    $this->assertSame($expected, Email::valid($input));
}
```

- **Fakes at interfaces (constructor-injected repos) over mock-everything** — the seam dictates the test.
- **Database tests** — per-test transactions/`RefreshDatabase`-style isolation; no shared mutable fixtures.
- **Run the full suite in CI with `--coverage` on the diff, and on each push.**

---

## 10. Async & Long-Running

- **PHP is synchronous-first** — for queued/async work, offload to a job queue (Redis/SQS) rather than emulating coroutines:

```php
$queue->dispatch(new SendEmailJob($userId, $template));
```

- **Workers** — long-lived processes (`roadrunner`/`swoole`/`octane`) are a deliberate architecture, not a default: memory leaks and opcache behavior change.
- **Keep request handlers short and stateless** — the stateless model is PHP's superpower; don't fight it.

---

## General Rules of Thumb

- **`declare(strict_types=1)` and typed everything — the compiler is the cheapest reviewer.**
- **`final` by default; interfaces at seams; constructor injection.**
- **Exceptions with `previous:`, narrow catches, fail-fast validation.**
- **Think security at the data boundary** — validate input, escape output, parameterize SQL.
- **PSR-12 + PHPStan + PHPUnit as the "done" gate.**
- **Composer lockfile and `--no-dev` deploy discipline.**

---

## Quick-Start Checklist

- [ ] `declare(strict_types=1)` on functional files; typed props/params/returns
- [ ] `final` + `readonly` where extension/mutation isn't wanted; interfaces at seams
- [ ] `match`/enums over stringly statuses; value objects for primitives
- [ ] Typed exceptions; narrow catches; `previous:` preserved; no swallowing
- [ ] PSR-12 clean (php-cs-fixer); PSR-4 autoloading exact
- [ ] Input validated, output escaped, SQL parameterized, passwords via `password_hash`
- [ ] `composer.lock` committed; deps audited; `--no-dev` in deploy
- [ ] PHPStan/Psalm passing at `level=max`; `php -l` in pre-commit
- [ ] PHPUnit contract tests + data providers; per-model DB isolation
