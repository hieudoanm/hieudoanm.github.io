# Review checklist

Focused reference for **prettier-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Run `biome migrate prettier --write`** to convert a Prettier config into `biome.json`. Most configs convert cleanly; review the result, especially indentation width and quote style.
- **Know the blocker before you start:** Biome has no formatter plugin API, so `prettier-plugin-tailwindcss` class sorting has no direct equivalent. If enforced Tailwind class order is a requirement, staying on Prettier (or running both) is the honest answer.
- **Do not migrate mid-project.** It is a large, noisy diff. Put it in its own PR, review the formatting-only changes deliberately, and get team agreement first.
- **A hybrid is legitimate:** Biome for linting plus Prettier for formatting, or vice versa. Just make sure exactly one tool owns each concern.

---

## Common Pitfalls

- **A floating Prettier range** (`^3.9.0`), which silently changes formatting on unrelated upgrades.
- **`eslint-plugin-prettier` still installed**, duplicating work and producing poor diagnostics.
- **`eslint-config-prettier` not last in `extends`**, so stylistic rules resurrect and fight the formatter.
- **Importing from `eslint-config-prettier` instead of `/flat`**, which is the wrong shape for ESLint 10.
- **Expecting Prettier to sort imports or catch bugs** — it does neither.
- **A `prettier.config.js` in a CommonJS package**, which throws on load; use `.mjs`.
- **Missing `.prettierignore`**, so CI reformat-minutes of generated files.
- **CI running `--write`**, which masks unformatted code instead of failing on it.
- **Abusing `prettier-ignore`**, which is a way of saying "I don't want to discuss this" rather than a formatting tool.
- **Migrating to Biome for a formatter plugin you actually depend on**, then losing the plugin.

---

## General Rules of Thumb

- One formatter owns the repo; exact version pinned; config committed and identical locally and in CI.
- Formatting is not linting — `eslint-config-prettier` last, `eslint-plugin-prettier` deleted.
- `// prettier-ignore` for deliberate, meaningful exceptions only, and never to dodge a disagreement.
- Plugins earn their place by doing what Prettier cannot: Tailwind class order, import sorting, `package.json` order.
- CI runs `--check` with a cache; `formatOnSave` in the editor does the daily work.
- If speed is the problem, measure the pipeline before switching tools.

---

## Quick-Start Checklist

- [ ] Exact Prettier version pinned; `prettier.config.mjs` committed at the root
- [ ] `.prettierignore` covers `dist`, `build`, `coverage`, lockfiles, `*.min.js`, generated code
- [ ] `printWidth`, `singleQuote`, `semi`, `trailingComma` chosen deliberately and applied repo-wide
- [ ] `format` and `format:check` scripts present; CI runs `--check . --ignore-unknown --cache`, never `--write`
- [ ] VS Code set to Prettier as default formatter with `formatOnSave` for owned languages
- [ ] `eslint-config-prettier/flat` extended last; `eslint-plugin-prettier` and `prettier/prettier` removed
- [ ] Plugins limited to ones that add real value; only one import-sorting plugin installed
- [ ] `prettier-ignore` used only for deliberate alignment, with the correct comment syntax per language
- [ ] Formatting output reviewed and committed before enabling the CI gate
- [ ] Biome/oxc migration evaluated only with measurements, and checked against required plugins
