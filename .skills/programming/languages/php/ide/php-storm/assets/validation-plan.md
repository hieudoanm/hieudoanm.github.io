# PhpStorm: Validation Plan

Use this plan to verify work guided by [PhpStorm](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Php and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Use the same formatter the repo enforces** (PHP-CS-Fixer, PHP_CodeSniffer, or Laravel Pint). PhpStorm's built-in formatter is a good default, but it must not fight the committed tool — a reformat-only commit every few weeks means two formatters are running
- [ ] **Set the "PHP Code Sniffer"/fixer ruleset in the IDE to the committed config** so the inspections match CI
- [ ] **Pre-commit hooks belong in the repo** (via composer scripts), not in the IDE's commit dialog; the hook is the shared rule
- [ ] **Run the static analyser (PHPStan/Psalm) in CI as the authority** and treat the IDE's inspections as a fast local approximation. The IDE does not have the full project type inference
- [ ] **.env is local and ignored; .env.example is committed.** The IDE's environment-file setting should point at .env and the diff should never include it

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
