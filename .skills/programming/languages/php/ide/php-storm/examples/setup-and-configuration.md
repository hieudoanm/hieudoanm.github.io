# PhpStorm: 1. Editions & Project Setup

## Scenario

A project is working on **1. editions & project setup** for PhpStorm. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **PhpStorm is commercial, with free student, open-source, and 30-day trial licences.** No Community edition.
- **Set the PHP interpreter from `composer.json`**, not from a manually chosen path. The interpreter is what the IDE indexes against, and a mismatch produces confident, wrong suggestions.
- **Let Composer own the dependencies** (Settings → PHP → Composer → "Use Composer" as the external library source). Never add a `vendor` path by hand; it desyncs from the lockfile.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Editions & Project Setup** section of [SKILL.md](../SKILL.md).
