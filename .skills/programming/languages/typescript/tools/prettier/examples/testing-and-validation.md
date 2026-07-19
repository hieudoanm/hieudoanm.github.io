# Prettier: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Prettier. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Exact Prettier version pinned; `prettier.config.mjs` committed at the root
- [ ] `.prettierignore` covers `dist`, `build`, `coverage`, lockfiles, `*.min.js`, generated code
- [ ] `printWidth`, `singleQuote`, `semi`, `trailingComma` chosen deliberately and applied repo-wide
- [ ] `format` and `format:check` scripts present; CI runs `--check . --ignore-unknown --cache`, never `--write`
- [ ] VS Code set to Prettier as default formatter with `formatOnSave` for owned languages
- [ ] `eslint-config-prettier/flat` extended last; `eslint-plugin-prettier` and `prettier/prettier` removed

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
