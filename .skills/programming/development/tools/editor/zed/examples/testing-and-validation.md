# Zed: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Zed. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Repository opened as a Zed project, not a raw folder
- [ ] `.zed/settings.json` committed with formatter, linter, and per-language rules
- [ ] `format_on_save` enabled and naming the repo's formatter
- [ ] Exactly one formatter and one linter active per language
- [ ] `typescript.tsdk` / `rust-analyzer` / `pyright` pointed at the project's toolchain
- [ ] `tsc --noEmit` (or the language equivalent) run in CI as the authority
- [ ] `keymap.json` committed if key bindings are customised

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
