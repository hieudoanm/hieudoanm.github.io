---
name: phpstorm-best-practices
description: Best practices for working in PhpStorm — Composer as the dependency source, the Laravel and Symfony plugins, Xdebug/PhpStorm profiler, code style, and JetBrains shared conventions. Use when setting up, debugging, or profiling a PHP project in PhpStorm.
---

# PhpStorm

PhpStorm is JetBrains' PHP IDE, and by a wide margin the strongest one: complete PHP 8.x support, first-class Composer integration, and the deepest framework plugins in the JetBrains catalogue — Laravel, Symfony, PHPUnit, and Rector among them. Its main risk is **IDE-side tooling quietly becoming a second, conflicting build system**. Practical PhpStorm work is about **letting Composer own the dependencies, keeping the code style the same one the repo enforces, and using the debugger and profiler the way a profiler is meant to be used**. Language rules live in [php.md](../php.md).

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

---

## 2. Composer

- **Run Composer through the IDE's built-in tool window** so the interpreter and the vendor state stay in agreement with what is indexed.
- **`composer.lock` drift is the single most common "works locally" bug:** a developer's lock is newer than CI's, so a class exists locally and is missing in production. Update the lock in the same commit as `composer.json`.
- **The platform check in `vendor/composer/platform_check.php`** fails fast on a wrong PHP version — that error is informative, not mysterious.
- **Autoloading is PSR-4 or classmap.** If a class is not found, the fault is the autoload map (`composer dump-autoload -o` for classmap, especially after adding files outside the registered roots) more often than the namespace.
- **Do not edit `composer.json` by hand for path repositories** without understanding `options.symlink`; a symlinked path repository behaves differently in a container than on a workstation.

---

## 3. Frameworks

- **The Laravel plugin is the main reason to use PhpStorm for Laravel** — route/model/relationship navigation, Blade completion, `php artisan` integration, and a config-aware environment reader.
- **Use the built-in PHP Server / `artisan serve` run configuration with the Laravel plugin's environment detection** so the `.env` values the app reads are the ones the IDE shows.
- **The Symfony plugin indexes the container when a debug container is dumpable** (`bin/console debug:container`), turning service IDs and argument types into completions. Regenerate the dump after a container change or the index goes stale.
- **Doctrine, PHPUnit, Pest, and Rector plugins exist** and each expects its own config file in the repo — the plugin is a view over `phpunit.xml`, not a replacement for it.
- **Rector can be run from the IDE,** but only in `--dry-run` mode: it rewrites source, and you want a reviewable diff in your VCS, not an unreviewed edit in your working tree.

---

## 4. Debugging & Profiling

- **Xdebug 3 is the debugger, and it is slow — a 2–10x slowdown is normal.** Never run it in a production-like local environment you are timing; use it for logic, and the profiler or a sampling profiler for speed.
- **Configure Xdebug in `php.ini`/`.env`, not in the IDE alone** — the CLI SAPI, the web SAPI, and the IDE each need a matching mode and port.
- **Use step debugging for control flow and a profiler for hot paths; do not use step debugging to find a slow function.** It is the wrong tool and it is slow in a compounding way.
- **The bundled PhpStorm profiler (Xdebug profiler or a sampling profiler) is genuinely good:** a call tree with inline expansion, plus allocation and timeline views for slow requests and memory growth.
- **Profile with a realistic request,** ideally in a local environment with production-like data volume, or the profile describes your fixture set.
- **Set a breakpoint on throw for fatals**; PHP fatal errors surface at a line that is downstream of the cause.
- **Turn on "stop at first PHP error"** while developing: it stops at the warning that production would only log, and warnings are usually the real defect.

---

## 5. Code Style & Quality

- **Use the same formatter the repo enforces** (PHP-CS-Fixer, PHP_CodeSniffer, or Laravel Pint). PhpStorm's built-in formatter is a good default, but it must not fight the committed tool — a reformat-only commit every few weeks means two formatters are running.
- **Set the "PHP Code Sniffer"/fixer ruleset in the IDE to the committed config** so the inspections match CI.
- **Pre-commit hooks belong in the repo** (via `composer` scripts), not in the IDE's commit dialog; the hook is the shared rule.
- **Run the static analyser (PHPStan/Psalm) in CI as the authority** and treat the IDE's inspections as a fast local approximation. The IDE does not have the full project type inference.
- **`.env` is local and ignored; `.env.example` is committed.** The IDE's environment-file setting should point at `.env` and the diff should never include it.

---

## 6. JetBrains Shared Conventions

- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).
- **An excluded directory is invisible to every inspection, refactoring, and search** — the usual cause of "the IDE missed it".
- **Settings are `This computer` or project-scoped**; anything shared belongs in a committed config file, not a personal setting.
- **The Toolbox App manages installs and plugin engines**; two engines for the same plugin explain occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- Interpreter, Composer, and lockfile in agreement; drift between them is the root cause of "missing class".
- `composer.lock` committed for applications, updated in the same commit as `composer.json`.
- One formatter, from the repo, configured in the IDE to match.
- Xdebug for control flow, profiler for speed; never step-debug a performance question.
- Regenerate the Symfony container dump after container changes.
- Rector only in `--dry-run` inside the IDE.
- `.env` ignored, `.env.example` committed; CI's static analyser is the authority.

---

## Quick-Start Checklist

- [ ] PHP interpreter set from `composer.json`, matching `require.php`
- [ ] Composer configured as the IDE's external library source; no manual `vendor` path
- [ ] `vendor/` ignored; `composer.lock` policy decided and documented
- [ ] `composer dump-autoload -o` run after adding files outside PSR-4 roots
- [ ] Formatter set to the repo's tool (Pint / PHP-CS-Fixer / PHPCS) with the committed ruleset
- [ ] Static analyser (PHPStan/Psalm) verified in CI, not only in the IDE
- [ ] Xdebug configured in the PHP config, matched across CLI, web, and IDE
- [ ] Profiler run on a realistic request to confirm it works
- [ ] Framework plugin environment detection confirmed against `.env`
- [ ] Symfony container dump regenerated after service changes
- [ ] Rector restricted to `--dry-run` in the IDE
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] Pre-commit hooks owned by the repo's composer scripts, not the IDE
