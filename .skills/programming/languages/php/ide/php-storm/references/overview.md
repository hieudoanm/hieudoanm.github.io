# Overview

Focused reference for **phpstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# PhpStorm

PhpStorm is JetBrains' PHP IDE, and by a wide margin the strongest one: complete PHP 8.x support, first-class Composer integration, and the deepest framework plugins in the JetBrains catalogue — Laravel, Symfony, PHPUnit, and Rector among them. Its main risk is **IDE-side tooling quietly becoming a second, conflicting build system**. Practical PhpStorm work is about **letting Composer own the dependencies, keeping the code style the same one the repo enforces, and using the debugger and profiler the way a profiler is meant to be used**. Language rules live in php.md.

_Verified against PhpStorm 2026.2.3 (September 2026) with PHP 8.4 and Composer 2. Laravel and Symfony plugin support tracks each framework's current major._

---

## 1. Editions & Project Setup

- **PhpStorm is commercial, with free student, open-source, and 30-day trial licences.** No Community edition.
- **Set the PHP interpreter from `composer.json`**, not from a manually chosen path. The interpreter is what the IDE indexes against, and a mismatch produces confident, wrong suggestions.
- **Let Composer own the dependencies** (Settings → PHP → Composer → "Use Composer" as the external library source). Never add a `vendor` path by hand; it desyncs from the lockfile.
- **Keep `vendor/` and `composer.lock` policy explicit:** `vendor/` is ignored, `composer.lock` is committed for applications and often intentionally not for libraries. Decide once and record it in the README.
- **A PHP version is declared in `composer.json`'s `require.php` and enforced by CI.** Configure the same range in the IDE or index a version you never deploy on.
- **Project SDKs matter for extension code:** a Composer library that also ships a plugin has two PHP versions in play, and the IDE must be told which is which.

```json
{
  "require": {
    "php": "^8.3",
    "laravel/framework": "^12.0"
  },
  "require-dev": {
    "phpunit/phpunit": "^11.0",
    "larastan/larastan": "^3.0"
  },
  "config": { "sort-packages": true }
}
```
