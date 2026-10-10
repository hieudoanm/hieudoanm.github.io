# Implementation notes

Focused reference for **eslint-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
