# Prettier: Common Pitfalls

## Scenario

A project is working on **common pitfalls** for Prettier. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **A floating Prettier range** (`^3.9.0`), which silently changes formatting on unrelated upgrades.
- **`eslint-plugin-prettier` still installed**, duplicating work and producing poor diagnostics.
- **`eslint-config-prettier` not last in `extends`**, so stylistic rules resurrect and fight the formatter.
- **Importing from `eslint-config-prettier` instead of `/flat`**, which is the wrong shape for ESLint 10.
- **Expecting Prettier to sort imports or catch bugs** — it does neither.
- **A `prettier.config.js` in a CommonJS package**, which throws on load; use `.mjs`.
- **Missing `.prettierignore`**, so CI reformat-minutes of generated files.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Common Pitfalls** section of [SKILL.md](../SKILL.md).
