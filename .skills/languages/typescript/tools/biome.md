---
name: biome-best-practices
description: Best practices for using Biome as a unified linter, formatter, and import organizer — configuration, type-aware rules, safe fixes, migrations, and where Biome still falls short of ESLint and Prettier.
---

# Biome

Biome is a **single Rust binary that formats, lints, and organizes imports**, replacing the [eslint.md](./eslint.md) + [prettier.md](./prettier.md) pairing with one config file. That consolidation is genuinely valuable — 20-30x faster, one config, one binary — but it is a real trade, because Biome's ecosystem is a fraction of ESLint's. Practical Biome work leans on **`biome.json` alone, `check --write` locally with `ci` in pipelines, and a clear-eyed view of the gaps**.

_Verified against Biome 2.5.14._

---

## 1. Choosing Biome

- **Best fit**: greenfield TypeScript, speed-sensitive CI or pre-commit, teams tired of two configs drifting.
- **Stay on ESLint + Prettier** when you depend on ESLint plugins Biome has not absorbed — notably type-aware rules it does not cover, or a framework plugin you cannot lose.
- **The Tailwind question decides most migrations.** Biome has **no formatter plugin API**, so `prettier-plugin-tailwindcss` class sorting has no equivalent. If enforced class order matters, stay on Prettier for CSS or run both.
- **A hybrid is a legitimate answer:** Biome for linting, Prettier for formatting, or the reverse — provided exactly one tool owns each concern.
- **Decide with the team, not for them.** A formatter/linter switch is a large, noisy diff and partial adoption produces conflicting output.

---

## 2. Configuration

- **Biome configures through `biome.json` / `biome.jsonc` only.** There is no JavaScript config file; a `biome.config.js` will be ignored.
- **Always set `$schema`** to the installed version. It gives editor autocompletion and config validation, and it is the fastest way to discover new options.
- **Enable VCS integration** (`"vcs": { "clientKind": "git", "useIgnoreFile": true }`) so Biome honours `.gitignore` instead of descending into `node_modules` and `dist`.
- **Set `files.ignoreUnknown: true`** so Biome skips binaries and unsupported file types rather than warning on every one.
- **`indentStyle` defaults to tabs.** Set `"space"` explicitly, or every Prettier migrant gets a whole-repo tab diff.
- **CSS and GraphQL formatting are off by default.** Opt in per language with `"css": { "formatter": { "enabled": true } }`.
- **Run `biome migrate` after a major version bump** — the config schema changes between majors and a stale config fails in confusing ways.

```jsonc
// biome.json
{
  "$schema": "https://biomejs.dev/schemas/2.5.14/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "ignoreUnknown": true },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
  },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "asNeeded" },
  },
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "assist": {
    "enabled": true,
    "actions": { "source": { "organizeImports": "on" } },
  },
}
```

---

## 3. Formatting

- **Formatting is Prettier-compatible but not bit-identical.** Expect a small number of diffs on migration — ternaries are the most common, where Biome uses condition-first ordering. Review the formatting diff deliberately rather than assuming it is wrong.
- **Language-specific options override global ones** in the `javascript`, `json`, `css`, `html` blocks, each with its own `formatter` key.
- **`trailingNewline` defaults to `true`.** Do not disable it: many POSIX tools, shell scripts, and VCS setups expect a terminating newline, and removing it creates phantom diffs.
- **`biome format --write` formats only.** There is no reason to run `format` and `lint` separately when `check` does both — that parses every file twice.
- **There is no formatter plugin API.** If you need Tailwind class sorting, Biome is the wrong formatter for that file type.

---

## 4. Linting

- **`"recommended": true` is the baseline and is sensible.** Biome's defaults are conservative enough that turning everything on does not produce the false-positive storm ESLint's `all` preset does.
- **Rules live in groups** — `correctness`, `suspicious`, `style`, `complexity`, `a11y`, `security` — with per-rule severity. Turning a rule `off` is a decision worth a comment in review.
- **Avoid `nursery` rules in enforced CI.** They are experimental, can change behaviour between minors, and may be slow. Try them locally.
- **Domains add framework rules** — `react`, `next`, `test`, `solid`, `vue`, `svelte`, `tailwind`, `project`. Enable only the ones you use.
- **Type-aware linting is Biome 2's addition**, exposed through the `project`/`types` domains. It requires project scanning, so first runs are slower; and it does not replicate all of `typescript-eslint`'s typed rules. If `no-floating-promises` is your reason for using ESLint, verify Biome covers your cases before dropping ESLint.

---

## 5. Import Organization

- **Import sorting is part of `assist`, not `linter`.** Configure it under `assist.actions.source.organizeImports` — looking for it in the linter config is the most common mistake.
- **Set it to `"on"`** so `check --write` also fixes ordering, and the formatter and import order never disagree.
- **Custom group ordering** lets you express a convention (external, built-in, aliases, relative) and have Biome enforce it.
- **This replaces `eslint-plugin-import` / `import-x` for ordering**, which is a large part of why migrations are simpler than they look.

---

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

- **Nested configs work in v2.** A child `biome.json` with `"root": false` extends the parent; the default `root: true` would wrongly terminate inheritance.
- **Keep a single `biome.json` per package** and let the root own shared formatter settings.
- **Cache the Biome binary and plugins in CI** — first-run download is the real cost, not the analysis.
- **Run `biome ci` as a separate CI step** from typecheck and tests, so a formatting failure is reported as a formatting failure.
- **Use the official VS Code extension.** Per-package config resolution in the extension was fixed in 2.0.4, so it is no longer a reason to avoid Biome in a monorepo.

---

## Common Pitfalls

- **Leaving `indentStyle` at the tab default** when migrating from Prettier — an entire repo reformats to tabs.
- **Looking for `organizeImports` under `linter`**; it belongs to `assist`.
- **Running `check` instead of `ci` in CI**, which silently formats and reports success on unformatted code.
- **A bare `// biome-ignore` with no reason,** which Biome itself reports.
- **`biome-ignore-all` placed mid-file,** where it is an unused suppression.
- **Enabling all `nursery` rules** and enforcing experimental behaviour in CI.
- **Applying `--unsafe` fixes in bulk** on a branch with real work.
- **Migrating away from Prettier while depending on `prettier-plugin-tailwindcss`**, and losing class sorting.
- **Forgetting `biome migrate` after a major bump,** leaving a config the binary cannot read.
- **Leaving `"root": true` in a nested config,** which silently breaks inheritance.

---

## General Rules of Thumb

- `biome.json` with `$schema` and VCS integration is the only config; no JavaScript config exists.
- `check --write` locally, `ci` in pipelines, `--staged` instead of `lint-staged`.
- Set `indentStyle` to `space`, opt in to CSS/GraphQL formatting, keep `trailingNewline` on.
- Import sorting lives under `assist`; enable it so it never disagrees with the formatter.
- Safe fixes by default, `--unsafe` only after reading the diff, and never in bulk.
- Every `biome-ignore` carries a reason; `nursery` rules stay out of CI.

---

## Quick-Start Checklist

- [ ] `biome init` run; `biome.json` committed with a pinned-version `$schema`
- [ ] `"vcs": { "clientKind": "git", "useIgnoreFile": true }` and `files.ignoreUnknown: true` set
- [ ] `formatter.indentStyle` set to `space`; CSS/GraphQL formatting opted into where used
- [ ] `linter.rules.recommended: true`; only the domains you actually use enabled
- [ ] `assist.actions.source.organizeImports: "on"` with group ordering matching team convention
- [ ] Local script uses `biome check --write .`; CI step uses `biome ci .` (never `check`)
- [ ] Pre-commit uses `--staged --no-errors-on-unmatched`; `lint-staged` removed if unused
- [ ] `--unsafe` fixes reviewed individually, never applied in bulk
- [ ] Every `biome-ignore` has a reason after the colon; `biome-ignore-all` only at file top
- [ ] Migration run with `biome migrate eslint --write` / `biome migrate prettier --write`, in a dedicated PR
- [ ] Confirmed no dependency on a Prettier formatter plugin (especially Tailwind class sorting) was dropped
- [ ] Vue/Svelte/Astro experimental support validated on real files before enabling
