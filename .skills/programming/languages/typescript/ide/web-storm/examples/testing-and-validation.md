# WebStorm: 5. Code Style & Quality

## Scenario

A project is working on **5. code style & quality** for WebStorm. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Configure the formatter and linter from the repo's config** — Prettier for format, ESLint for lint — and let the IDE run the repo's binaries rather than its own reimplementation, so the editor and `pnpm format` produce identical output.
- **Prettier's Tailwind plugin sorts classes; the IDE must use the same plugin and config** or every file reorders on the next format.
- **`eslint --fix` and `prettier --write` in the IDE should be wired to the same scripts as CI,** so a save produces the same result as a commit hook.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Code Style & Quality** section of [SKILL.md](../SKILL.md).
