# PhpStorm: 2. Composer

## Scenario

A project is working on **2. composer** for PhpStorm. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Run Composer through the IDE's built-in tool window** so the interpreter and the vendor state stay in agreement with what is indexed.
- **`composer.lock` drift is the single most common "works locally" bug:** a developer's lock is newer than CI's, so a class exists locally and is missing in production. Update the lock in the same commit as `composer.json`.
- **The platform check in `vendor/composer/platform_check.php`** fails fast on a wrong PHP version — that error is informative, not mysterious.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Composer** section of [SKILL.md](../SKILL.md).
