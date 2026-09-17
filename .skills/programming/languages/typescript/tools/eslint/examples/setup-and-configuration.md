# ESLint: 1. Flat Config Is the Only Format

## Scenario

A project is working on **1. flat config is the only format** for ESLint. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`.eslintrc` is removed in ESLint 10.** The legacy format is no longer supported at all; there is no environment variable to re-enable it.
- **ESLint 10 requires Node 20+** (19, 21, and 23 are dropped). Set `engines` and CI to match.
- **Use `eslint.config.mjs` and export from `defineConfig`** (`eslint/config`). It flattens nested objects and arrays, supports `extends`, and is type-safe — you get autocomplete and config typos become build errors.
- **`globalIgnores([...])` replaces `.eslintignore`.** A bare `{ ignores: [...] }` object is a _local_ exclusion, not a global skip; use the helper when you mean global.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Flat Config Is the Only Format** section of [SKILL.md](../SKILL.md).
