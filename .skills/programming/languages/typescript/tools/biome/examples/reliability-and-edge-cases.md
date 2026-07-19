# Biome: Common Pitfalls

## Scenario

A project is working on **common pitfalls** for Biome. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Leaving `indentStyle` at the tab default** when migrating from Prettier — an entire repo reformats to tabs.
- **Looking for `organizeImports` under `linter`**; it belongs to `assist`.
- **Running `check` instead of `ci` in CI**, which silently formats and reports success on unformatted code.
- **A bare `// biome-ignore` with no reason,** which Biome itself reports.
- **`biome-ignore-all` placed mid-file,** where it is an unused suppression.
- **Enabling all `nursery` rules** and enforcing experimental behaviour in CI.
- **Applying `--unsafe` fixes in bulk** on a branch with real work.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Common Pitfalls** section of [SKILL.md](../SKILL.md).
