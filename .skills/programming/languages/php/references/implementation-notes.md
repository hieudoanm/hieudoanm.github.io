# Implementation notes

Focused reference for **php-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
