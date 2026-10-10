# Implementation notes

Focused reference for **biome-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Commands & Safety

- **`biome check --write` is the local workhorse**: lint fixes, formatting, and import organization in one pass.
- **Only safe fixes are applied by default.** Fixes that can change behaviour need `--unsafe`. Review those in a diff, never in bulk on a branch you care about.
- **`biome ci` is the pipeline command.** It is read-only and will not write files; `check` in CI can "fix" code and mask that it was unformatted, which is the exact bug you want CI to catch.
- **`--staged` makes `lint-staged` unnecessary** for Biome-only setups, since Biome 1.7. You can drop the extra dependency and keep a simple hook.
- **Add `--no-errors-on-unmatched`** to git hooks, or a commit with no matching files fails the hook.
- **Pin the exact Biome version** (`--save-exact`). Formatting output can shift between minors, which produces diffs nobody authored.

---

## 7. Suppressions

- **`// biome-ignore lint: <reason>`** — the reason after the colon is **required**, not optional. A bare `biome-ignore` is itself reported.
- **`// biome-ignore-all` must be at the very top of the file.** Placed mid-file it is treated as unused and reported.
- **Use range suppressions (`biome-ignore-start` / `biome-ignore-end`) sparingly** and keep the rule specifiers matching, or you get unused-suppression warnings.
- **Every suppression is a review conversation.** An unexplained ignore is a defect with a comment attached.

---

## 8. Frameworks & Migration

- **Vue, Svelte, and Astro are supported** since 2.3, but the support is **experimental** and opt-in via `html.experimentalFullSupportEnabled`. Framework-specific syntax (Svelte control flow, Astro JSX-like syntax) is not fully covered — validate before committing to it.
- **Migrate from ESLint with `biome migrate eslint --write`**; add `--include-inspired` if you want the rules Biome only _inspired_ by ESLint rules.
- **Migrate from Prettier with `biome migrate prettier --write`.** Then review: the generated `formatter.indentWidth` can conflict with an existing `.editorconfig`, in which case delete the Biome value and let `.editorconfig` own it.
- **Tailwind v4 needs explicit parser help.** `@theme` blocks fail to parse unless you enable `css.parser.tailwindDirectives`, alongside `cssModules` for CSS Modules.
- **Remove now-dead Prettier plugins** after migrating (for example `prettier-plugin-astro`) — leaving them installed causes conflicts.
- **Migrate in its own PR.** A formatter migration mixed into feature work is unreviewable, and that is how teams quietly end up with half the repo on each tool.

---

## 9. Monorepo & CI
