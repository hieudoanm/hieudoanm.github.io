# PhpStorm: 5. Code Style & Quality

## Scenario

A project is working on **5. code style & quality** for PhpStorm. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Use the same formatter the repo enforces** (PHP-CS-Fixer, PHP_CodeSniffer, or Laravel Pint). PhpStorm's built-in formatter is a good default, but it must not fight the committed tool — a reformat-only commit every few weeks means two formatters are running.
- **Set the "PHP Code Sniffer"/fixer ruleset in the IDE to the committed config** so the inspections match CI.
- **Pre-commit hooks belong in the repo** (via `composer` scripts), not in the IDE's commit dialog; the hook is the shared rule.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Code Style & Quality** section of [SKILL.md](../SKILL.md).
