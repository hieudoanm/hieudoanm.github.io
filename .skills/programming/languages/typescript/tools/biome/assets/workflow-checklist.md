# Biome: Workflow Checklist

A practical run sheet for applying [Biome](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Choosing Biome: **Best fit**: greenfield TypeScript, speed-sensitive CI or pre-commit, teams tired of two configs drifting
- [ ] 1. Choosing Biome: **Stay on ESLint + Prettier** when you depend on ESLint plugins Biome has not absorbed — notably type-aware rules it does not cover, or a framework plugin you cannot lose
- [ ] 2. Configuration: **Biome configures through biome.json / biome.jsonc only.** There is no JavaScript config file; a biome.config.js will be ignored
- [ ] 2. Configuration: **Always set $schema** to the installed version. It gives editor autocompletion and config validation, and it is the fastest way to discover new options
- [ ] 3. Formatting: **Formatting is Prettier-compatible but not bit-identical.** Expect a small number of diffs on migration — ternaries are the most common, where Biome uses condition-first ordering. Review the formatting diff deliberately rather than assuming it is wrong
- [ ] 3. Formatting: **Language-specific options override global ones** in the javascript, json, css, html blocks, each with its own formatter key
- [ ] 4. Linting: **"recommended": true is the baseline and is sensible.** Biome's defaults are conservative enough that turning everything on does not produce the false-positive storm ESLint's all preset does
- [ ] 4. Linting: **Rules live in groups** — correctness, suspicious, style, complexity, a11y, security — with per-rule severity. Turning a rule off is a decision worth a comment in review
- [ ] 5. Import Organization: **Import sorting is part of assist, not linter.** Configure it under assist.actions.source.organizeImports — looking for it in the linter config is the most common mistake
- [ ] 5. Import Organization: **Set it to "on"** so check --write also fixes ordering, and the formatter and import order never disagree

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
