# VS Code: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for VS Code. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `.vscode/settings.json` committed with formatter, EOF, and trim settings
- [ ] `editor.defaultFormatter` scoped per language, not one global
- [ ] `editor.codeActionsOnSave` running the project's ESLint fix, not a reimplementation
- [ ] ESLint and Prettier not both applying formatting (config-prettier wired)
- [ ] `extensions.json` pinning recommended extension versions
- [ ] `typescript.tsdk` pointed at the workspace's `node_modules/typescript`
- [ ] `tsc --noEmit` run in CI as the type authority

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
