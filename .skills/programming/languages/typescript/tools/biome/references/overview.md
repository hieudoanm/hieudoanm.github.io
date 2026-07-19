# Overview

Focused reference for **biome-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Biome

Biome is a **single Rust binary that formats, lints, and organizes imports**, replacing the eslint.md + prettier.md pairing with one config file. That consolidation is genuinely valuable — 20-30x faster, one config, one binary — but it is a real trade, because Biome's ecosystem is a fraction of ESLint's. Practical Biome work leans on **`biome.json` alone, `check --write` locally with `ci` in pipelines, and a clear-eyed view of the gaps**.

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
