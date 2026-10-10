# Workflow notes

Focused reference for **eslint-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
- **The `no-unsafe-*` family** (`no-unsafe-assignment`, `no-unsafe-member-access`, `no-unsafe-argument`, `no-unsafe-call`, `no-unsafe-return`) is the automated defence against `any` leaking in from an untyped boundary. This is the lint-level half of what typescript.md covers at the type level.
- **`restrict-template-expressions`** stops raw objects being interpolated into strings as `[object Object]`.
- **Keep `no-explicit-any` on**, and prefer `unknown` at boundaries. See typescript.md §8 for the validation side.
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
