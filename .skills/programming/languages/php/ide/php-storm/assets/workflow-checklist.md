# PhpStorm: Workflow Checklist

A practical run sheet for applying [PhpStorm](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Project Setup: **PhpStorm is commercial, with free student, open-source, and 30-day trial licences.** No Community edition
- [ ] 1. Editions & Project Setup: **Set the PHP interpreter from composer.json**, not from a manually chosen path. The interpreter is what the IDE indexes against, and a mismatch produces confident, wrong suggestions
- [ ] 2. Composer: **Run Composer through the IDE's built-in tool window** so the interpreter and the vendor state stay in agreement with what is indexed
- [ ] 2. Composer: **composer.lock drift is the single most common "works locally" bug:** a developer's lock is newer than CI's, so a class exists locally and is missing in production. Update the lock in the same commit as composer.json
- [ ] 3. Frameworks: **The Laravel plugin is the main reason to use PhpStorm for Laravel** — route/model/relationship navigation, Blade completion, php artisan integration, and a config-aware environment reader
- [ ] 3. Frameworks: **Use the built-in PHP Server / artisan serve run configuration with the Laravel plugin's environment detection** so the .env values the app reads are the ones the IDE shows
- [ ] 4. Debugging & Profiling: **Xdebug 3 is the debugger, and it is slow — a 2–10x slowdown is normal.** Never run it in a production-like local environment you are timing; use it for logic, and the profiler or a sampling profiler for speed
- [ ] 4. Debugging & Profiling: **Configure Xdebug in php.ini/.env, not in the IDE alone** — the CLI SAPI, the web SAPI, and the IDE each need a matching mode and port
- [ ] 5. Code Style & Quality: **Use the same formatter the repo enforces** (PHP-CS-Fixer, PHP_CodeSniffer, or Laravel Pint). PhpStorm's built-in formatter is a good default, but it must not fight the committed tool — a reformat-only commit every few weeks means two formatters are running
- [ ] 5. Code Style & Quality: **Set the "PHP Code Sniffer"/fixer ruleset in the IDE to the committed config** so the inspections match CI

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
