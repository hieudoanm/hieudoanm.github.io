# Biome: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Biome. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `biome init` run; `biome.json` committed with a pinned-version `$schema`
- [ ] `"vcs": { "clientKind": "git", "useIgnoreFile": true }` and `files.ignoreUnknown: true` set
- [ ] `formatter.indentStyle` set to `space`; CSS/GraphQL formatting opted into where used
- [ ] `linter.rules.recommended: true`; only the domains you actually use enabled
- [ ] `assist.actions.source.organizeImports: "on"` with group ordering matching team convention
- [ ] Local script uses `biome check --write .`; CI step uses `biome ci .` (never `check`)
- [ ] Pre-commit uses `--staged --no-errors-on-unmatched`; `lint-staged` removed if unused

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
