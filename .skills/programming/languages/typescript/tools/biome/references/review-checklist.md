# Review checklist

Focused reference for **biome-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
