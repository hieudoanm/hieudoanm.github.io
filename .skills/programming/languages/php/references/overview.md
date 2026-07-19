# Overview

Focused reference for **php-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
