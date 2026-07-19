# ESLint: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for ESLint. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `eslint.config.mjs` exporting `defineConfig(...)`; no `.eslintrc` anywhere
- [ ] Node 20+ in `engines` and CI image
- [ ] `globalIgnores([...])` for `dist`, `coverage`, `**/*.d.ts`
- [ ] `typescript-eslint` single package; `@typescript-eslint` namespace preserved
- [ ] `parserOptions.projectService: true` with `tsconfigRootDir` set
- [ ] `no-floating-promises`, `no-misused-promises`, `no-explicit-any` enabled
- [ ] `disableTypeChecked` applied to `.js` files

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
