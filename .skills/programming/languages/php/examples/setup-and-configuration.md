# PHP Best Practices: 1. Strict Types & Type Safety

## Source guidance

This example applies the **1. Strict Types & Type Safety** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`declare(strict_types=1);` at the top of every functional file** — scalar coercion is opt-in, not silent:
- **Types on everything a boundary touches** — typed properties, params, returns:
- **`?Type` for nullable, `null` default; union types (`int|string`) where the domain genuinely mixes; `mixed` only at internal seams.**
- **`readonly`/`final` where mutation/inheritance isn't wanted** — the compiler enforces what comments used to promise.
- **`array` with docblock shape (`@param list<User>`) at API boundaries; `array<int, User>` for the shape contract.**

## Example

```php
<?php
declare(strict_types=1);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for php-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
