---
name: "eslint-best-practices"
description: "Best practices for linting JavaScript and TypeScript with ESLint — flat config, typed linting, rule strategy, plugin selection, monorepo overrides, and CI gating. Use when setting up, structuring, or debugging an ESLint configuration."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "developer-tools"
  - "eslint"
when_to_use: "Use when setting up, structuring, or debugging an ESLint configuration."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../prettier/SKILL.md"
  - "../../SKILL.md"
  - "../husky/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# ESLint

ESLint is the de facto linter for JavaScript and TypeScript. Its value is not style enforcement — that is [prettier.md](../prettier/SKILL.md)'s job — but **catching whole classes of bug** (unhandled promises, unsafe `any`, broken hook rules, shadowed globals) statically. Practical ESLint work leans on **flat config with `defineConfig`, type-aware linting via `projectService`, and a deliberately small rule set** — while language-level type guidance lives in [typescript.md](../../SKILL.md).

_Verified against ESLint 10.11, typescript-eslint 8.71._

---

## 1. Flat Config Is the Only Format

- **`.eslintrc` is removed in ESLint 10.** The legacy format is no longer supported at all; there is no environment variable to re-enable it.
- **ESLint 10 requires Node 20+** (19, 21, and 23 are dropped). Set `engines` and CI to match.
- **Use `eslint.config.mjs` and export from `defineConfig`** (`eslint/config`). It flattens nested objects and arrays, supports `extends`, and is type-safe — you get autocomplete and config typos become build errors.
- **`globalIgnores([...])` replaces `.eslintignore`.** A bare `{ ignores: [...] }` object is a _local_ exclusion, not a global skip; use the helper when you mean global.
- **Config lookup is now per-file.** ESLint 10 walks up from each linted file to find `eslint.config.*` instead of starting at the cwd — which is what makes per-package configs in a monorepo just work.

```js
// eslint.config.mjs
// @ts-check
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig(
  globalIgnores(['dist', 'coverage', '**/*.d.ts']),
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettier],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  { files: ['**/*.js'], extends: [tseslint.configs.disableTypeChecked] }
);
```

- **`prettier` goes last in `extends`** so it can switch off every stylistic rule that fights the formatter. Never run both and negotiate.

---

## 2. TypeScript Integration

- **Use the single `typescript-eslint` package**, not the old `@typescript-eslint/parser` + `eslint-plugin` + `@typescript-eslint/eslint-plugin` trio. It re-exports all three.
- **Prefer core `defineConfig` over `tseslint.config()`.** The latter is deprecated, and the two differ in one sharp way: `defineConfig` _intersects_ `files` from an extended config with the parent's, where `tseslint.config` _overrides_ it. A `files` intersection can silently produce an empty match and a rule that does nothing.
- **Keep the `@typescript-eslint` plugin namespace.** Registering the same plugin under a second namespace is legal and makes it report duplicates.
- **Layer presets deliberately**: `recommended` (correctness baseline) → `strict` (opinionated, catches more bugs) → `stylistic` (consistency, no logic change). Stop where the noise starts.
- **Disable `recommended` in favour of `strictTypeChecked`/`stylisticTypeChecked` only once typed linting is actually on** — the non-typed variants enable rules that then do nothing.
- **`.js` in a TS project should get `disableTypeChecked`**, or you pay full type-aware cost on files with no `tsconfig` coverage.

---

## 3. Typed Linting (the High-Value Part)

- **Turn on `parserOptions.projectService: true`.** This is what unlocks rules that catch real runtime bugs rather than style preferences.
- **`no-floating-promises`** is the single highest-value rule in the ecosystem: it finds every `fetch()` or async call whose rejection is silently discarded, which is how unhandled rejections reach production.
- **Add `no-misused-promises`** to catch promises passed where a synchronous callback is expected — the classic source of state updates firing after unmount.
- **`await-thenable` and `no-unnecessary-type-assertion`** remove dead code paths that hide real errors.
- **The `no-unsafe-*` family** (`no-unsafe-assignment`, `no-unsafe-member-access`, `no-unsafe-argument`, `no-unsafe-call`, `no-unsafe-return`) is the automated defence against `any` leaking in from an untyped boundary. This is the lint-level half of what [typescript.md](../../SKILL.md) covers at the type level.
- **`restrict-template-expressions`** stops raw objects being interpolated into strings as `[object Object]`.
- **Keep `no-explicit-any` on**, and prefer `unknown` at boundaries. See [typescript.md](../../SKILL.md) §8 for the validation side.
- **Typed linting costs time.** Measure it; if it is the bottleneck, add a fast non-typed pass on pre-commit and reserve typed linting for CI.

---

## 4. Rule Strategy

- **Start from `recommended` and add rules one at a time**, reading each one's docs. Turning on a whole `all` preset produces thousands of false positives, and a rule set nobody reads is worse than none.
- **Use `warn` for rules under evaluation, `error` once agreed.** A rule that blocks merges before the team has agreed on it gets bypassed with `--quiet` or an inline disable.
- **Disable with justification.** Every `eslint-disable-next-line` needs a comment saying why; a bare disable is a bug ticket.
- **Never disable a correctness rule to make a test pass** — fix the code.
- **Rules last-wins in array order**, so put your local `rules` block after the presets it overrides. This is the whole mental model for flat config.

---

## 5. Monorepos & Overrides

- **One config object per concern, scoped with `files`.** Environment-specific rules (Node globals in `config/`, browser globals in `client/`, test globals in `**/*.test.ts`) belong in their own objects, not in a giant conditional.
- **Nested `eslint.config.mjs` per package** now works out of the box thanks to per-file lookup. Keep the root config minimal and let packages own their rules.
- **Ignore build output with `globalIgnores`,** not with `ignorePatterns`-style per-object `ignores`, unless you genuinely mean a local exclusion.
- **Keep generated files out**: `dist`, `coverage`, `**/*.d.ts`, `*.min.js`, and build-script outputs.
- **Use `tseslint.globs.ts` / `globs`** for the canonical TS file globs rather than hand-rolling extension lists.

---

## 6. Plugin Selection

- **React**: `eslint-plugin-react-hooks` is mandatory — the rules of hooks are a correctness net, not style. Add `eslint-plugin-react-compiler` if you use the React Compiler, and `jsx-a11y` for accessibility.
- **Tests**: `eslint-plugin-vitest`, `eslint-plugin-jest`, or `eslint-plugin-playwright`, scoped to their test globs only.
- **Imports**: `eslint-plugin-import-x` (the maintained fork) with `import-x/order` if you want ordering enforced by lint.
- **Utilities**: `eslint-plugin-unicorn` for modern-JS rules, `eslint-plugin-n` for Node-specific correctness, `eslint-plugin-jsdoc` for docs.
- **Node/browser globals** come from the `globals` package, wired through `languageOptions.globals` — never hand-written.
- **Every plugin is a supply-chain dependency.** Prefer well-maintained packages, check install counts, and prefer official or vendor-maintained plugins over individuals for anything load-bearing.

---

## 7. Editor & Pre-Commit

- **VS Code ESLint extension with `eslint.validate` scoped to your actual source globs** — validating `dist` and `node_modules` is the usual cause of "ESLint is slow".
- **Keep pre-commit fast and shallow.** Run the formatter plus a fast non-typed lint on staged files only (`lint-staged` or a `lefthook`/`simple-git-hooks` task). Deep typed linting belongs in CI, not in the commit path.
- **`--fix` in the hook is a feature.** It removes most lint errors before the human ever sees them.
- **Do not let hooks get bypassed.** If developers routinely pass `--no-verify`, the hook is too slow — fix the speed, not the policy.

---

## 8. CI

- **Gate with `--max-warnings 0`** so a `warn` backlog cannot accumulate indefinitely.
- **Cache `node_modules` and the ESLint cache**; the cache directory speeds repeat runs significantly.
- **Split lint from typecheck in CI** so a type error does not get reported as a lint failure and vice versa.
- **Consider `oxlint` as a fast pre-pass** — a Rust linter that runs in a fraction of the time and is a useful gate, though it is not a replacement for type-aware rules.
- **Report the same way locally and in CI.** If CI lints the whole tree and pre-commit lints only staged files, expect mismatches.

---

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
