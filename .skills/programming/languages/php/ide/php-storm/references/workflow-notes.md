# Workflow notes

Focused reference for **phpstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
