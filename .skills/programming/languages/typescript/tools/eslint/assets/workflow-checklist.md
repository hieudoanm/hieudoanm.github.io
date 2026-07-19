# ESLint: Workflow Checklist

A practical run sheet for applying [ESLint](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Flat Config Is the Only Format: **.eslintrc is removed in ESLint 10.** The legacy format is no longer supported at all; there is no environment variable to re-enable it
- [ ] 1. Flat Config Is the Only Format: **ESLint 10 requires Node 20+** (19, 21, and 23 are dropped). Set engines and CI to match
- [ ] 2. TypeScript Integration: **Use the single typescript-eslint package**, not the old @typescript-eslint/parser + eslint-plugin + @typescript-eslint/eslint-plugin trio. It re-exports all three
- [ ] 2. TypeScript Integration: **Prefer core defineConfig over tseslint.config().** The latter is deprecated, and the two differ in one sharp way: defineConfig _intersects_ files from an extended config with the parent's, where tseslint.config _overrides_ it. A files intersection can silently produce an empty match and a rule that does nothing
- [ ] 3. Typed Linting (the High-Value Part): **Turn on parserOptions.projectService: true.** This is what unlocks rules that catch real runtime bugs rather than style preferences
- [ ] 3. Typed Linting (the High-Value Part): **no-floating-promises** is the single highest-value rule in the ecosystem: it finds every fetch() or async call whose rejection is silently discarded, which is how unhandled rejections reach production
- [ ] 4. Rule Strategy: **Start from recommended and add rules one at a time**, reading each one's docs. Turning on a whole all preset produces thousands of false positives, and a rule set nobody reads is worse than none
- [ ] 4. Rule Strategy: **Use warn for rules under evaluation, error once agreed.** A rule that blocks merges before the team has agreed on it gets bypassed with --quiet or an inline disable
- [ ] 5. Monorepos & Overrides: **One config object per concern, scoped with files.** Environment-specific rules (Node globals in config/, browser globals in client/, test globals in **/*.test.ts) belong in their own objects, not in a giant conditional
- [ ] 5. Monorepos & Overrides: **Nested eslint.config.mjs per package** now works out of the box thanks to per-file lookup. Keep the root config minimal and let packages own their rules

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
