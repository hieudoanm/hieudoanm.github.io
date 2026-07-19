# Volta Best Practices: 3. Per-Project Consistency

## Scenario

A project is working on **3. per-project consistency** for Volta Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Every command runs with the pinned toolchain — including `npm ci`/`yarn install`:**
- **Lockfiles + Volta block double-ensure: pinning is declarative, lockfiles pin the graph.**
- **Multiple versions coexist; `volta pin` is the single source — avoid dual nvm+volta in one ergonomic.**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Per-Project Consistency** section of [SKILL.md](../SKILL.md).
