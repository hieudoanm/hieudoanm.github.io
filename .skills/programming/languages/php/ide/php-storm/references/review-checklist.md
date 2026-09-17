# Review checklist

Focused reference for **phpstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
