# Review checklist

Focused reference for **eslint-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## Common Pitfalls

- **Running Prettier and stylistic ESLint rules against each other** — infinite churn. `eslint-config-prettier/flat` last, always.
- **`tseslint.config()`** — deprecated, and its `files` override semantics differ from `defineConfig` in ways that silently disable rules.
- **Turning on a type-aware preset without `projectService`**, so every rule is a no-op and you believe you have coverage you do not.
- **Using `{ ignores: [...] }` expecting a global skip** — use `globalIgnores()`.
- **Enabling an `all` preset** and drowning in false positives.
- **A bare `eslint-disable`** with no explanation, which outlives the reason.
- **Storing secrets in an `env` block or inline comment** — config files get committed; use your CI secret store.
- **Validating `dist` in the editor**, which is the top cause of a slow ESLint experience.
- **Deep typed linting in the pre-commit hook**, pushing developers to `--no-verify`.

---

## General Rules of Thumb

- Flat config only, authored through `defineConfig` and `globalIgnores`, with `prettier` last.
- Turn on `projectService` and the `no-floating-promises` / `no-unsafe-*` rules; they find real bugs.
- Add rules incrementally from `recommended`; every disable carries a reason.
- One config object per concern, scoped by `files`; nested configs per monorepo package.
- Fast lint on pre-commit, deep typed lint in CI, same globs in both.
- Every plugin is a dependency you have to vet.

---

## Quick-Start Checklist

- [ ] `eslint.config.mjs` exporting `defineConfig(...)`; no `.eslintrc` anywhere
- [ ] Node 20+ in `engines` and CI image
- [ ] `globalIgnores([...])` for `dist`, `coverage`, `**/*.d.ts`
- [ ] `typescript-eslint` single package; `@typescript-eslint` namespace preserved
- [ ] `parserOptions.projectService: true` with `tsconfigRootDir` set
- [ ] `no-floating-promises`, `no-misused-promises`, `no-explicit-any` enabled
- [ ] `disableTypeChecked` applied to `.js` files
- [ ] `eslint-config-prettier/flat` last in `extends`; `eslint-plugin-prettier` and the `prettier/prettier` rule removed
- [ ] Environment/test/framework rules in scoped config objects, not conditionals
- [ ] Pre-commit hook runs formatter + fast lint on staged files; CI runs `--max-warnings 0` with full typed lint
- [ ] Every `eslint-disable` carries a written justification
