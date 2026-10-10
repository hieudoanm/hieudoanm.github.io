# ESLint: Common Pitfalls

## Scenario

A project is working on **common pitfalls** for ESLint. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Running Prettier and stylistic ESLint rules against each other** — infinite churn. `eslint-config-prettier/flat` last, always.
- **`tseslint.config()`** — deprecated, and its `files` override semantics differ from `defineConfig` in ways that silently disable rules.
- **Turning on a type-aware preset without `projectService`**, so every rule is a no-op and you believe you have coverage you do not.
- **Using `{ ignores: [...] }` expecting a global skip** — use `globalIgnores()`.
- **Enabling an `all` preset** and drowning in false positives.
- **A bare `eslint-disable`** with no explanation, which outlives the reason.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Common Pitfalls** section of [SKILL.md](../SKILL.md).
