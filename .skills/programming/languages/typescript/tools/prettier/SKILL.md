---
name: prettier-best-practices
description: Best practices for formatting JavaScript and TypeScript with Prettier — configuration, intentional non-formatting, plugin selection, ESLint integration, and CI enforcement. Use when setting up, structuring, or debugging a Prettier setup.
---

# Prettier

Prettier is a **formatter**, not a linter. It parses your code and prints it back with a single canonical style, which is the whole point: it removes an entire category of code review. Practical Prettier work is mostly about **one formatter in the repo, a config that matches the house style, and knowing what Prettier deliberately does not do** — while linting belongs to [eslint.md](./eslint.md), and the alternative single-tool approach is [biome.md](./biome.md).

_Verified against Prettier 3.9.9. There is no Prettier 4 — the "Prettier 4 Rust rewrite" circulating in blog posts is speculation, not a release._

---

## 1. Configuration

- **Use `prettier.config.mjs`** (or `.prettierrc.json`) at the repo root, committed. The `"prettier"` key in `package.json` works but hides the config in a busy file.
- **ESM config needs `.mjs`** unless your `package.json` has `"type": "module"` — a bare `prettier.config.js` with CommonJS `.js` will throw.
- **Pin the exact version** (`"prettier": "3.9.9"`, not `^3.9.9`). Prettier is explicit about this: formatter output changes between minors, and a floating range produces diffs nobody authored.
- **Commit `.prettierignore`.** At minimum: `dist`, `build`, `coverage`, `node_modules`, `pnpm-lock.yaml`, `*.min.js`, generated clients, and vendored code.
- **Do not use `.editorconfig` and Prettier to fight.** Pick one owner for formatting decisions; `.editorconfig` is still worth having for editors, but let Prettier win on JS/TS.
- **Run the same config locally and in CI.** A `.prettierrc` that differs by directory is the source of "works on my machine" format churn.

```json
// .prettierrc.json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "arrowParens": "always",
  "quoteProps": "as-needed",
  "objectWrap": "preserve",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- **`printWidth` is a soft target**, not a limit. Prettier will exceed it for long strings, long import lists, and chains it cannot break.
- **`trailingComma: "all"` is the v3 default** and the right answer for a modern ESM codebase; `"es5"` was the v2 default and is now the minority.
- **`objectWrap: "preserve"`** keeps your choice of single-line vs multi-line objects for the first property, which reduces diff noise in files with mixed shapes.

---

## 2. What Prettier Does Not Do

- **It does not sort imports, object keys, JSX props, or object properties.** That is a plugin's job, or Biome's, or a human's.
- **It does not lint.** There are no correctness rules in Prettier at all — anything "prettier" reports about your code style that is not a formatting question belongs in ESLint.
- **It does not understand your intent.** It cannot know that a long ternary deserves a comment, that a magic number needs a name, or that a dependency array is wrong.
- **It preserves comments but not always their placement.** Comment reflow around member chains and long expressions is the most common complaint; reach for `// prettier-ignore` there.
- **It does not format inside macros, decorators with unusual shapes, or some template-literal heavy DSLs.** These are the exceptions where `prettier-ignore` is legitimate.
- **It does not reformat code it cannot parse.** A syntax error is reported as a parse error, not silently skipped — do not ignore those.

---

## 3. Suppressing Formatting

- **`// prettier-ignore` disables formatting for the next node.** Use it for deliberate matrices, generated-like lookup tables, and alignment that carries meaning.
- **Never use it to dodge a diff you disagree with.** Reformat the code and argue about the config change instead — that is what the config is for.
- **HTML/Markdown/GraphQL use `<!-- prettier-ignore -->`**; YAML uses `# prettier-ignore`. Putting the wrong comment type in a block means it silently does nothing.
- **Blanket-ignoring a whole file** with `// prettier-ignore` at the top is a smell. Either the file is generated (and should be in `.prettierignore`) or the config is wrong for that file type.

---

## 4. Plugins

- **`prettier-plugin-tailwindcss`** is the highest-value plugin: it sorts Tailwind utility classes, which no human does consistently. Point it at your stylesheet with `tailwindStylesheet` so custom classes sort correctly.
- **Import sorting**: `prettier-plugin-organize-imports` (uses the TypeScript language service) or `@trivago/prettier-plugin-sort-imports` (regex-based, supports custom groups). Pick one, and expect to re-verify on every TypeScript upgrade since the organize-imports variant tracks the compiler.
- **`prettier-plugin-packagejson`** normalizes `package.json` key order — cheap consistency for a file that appears in every diff.
- **`prettier-plugin-jsdoc`** reformats JSDoc blocks, and is a genuine time-saver if you write doc comments.
- **Framework plugins** (`prettier-plugin-astro`, `prettier-plugin-svelte`, `@prettier/plugin-angular`... ) exist but each adds a dependency; only add one for a framework you actually use heavily.
- **Prefer fewer plugins.** Each is unmaintained the moment its framework changes course, and plugin output differences are a common source of "Prettier is not idempotent" bugs.

---

## 5. ESLint Integration

- **Install `eslint-config-prettier` and extend it LAST.** It switches off every stylistic ESLint rule that conflicts with Prettier, so the two stop fighting.
- **Delete `eslint-plugin-prettier` and the `prettier/prettier` rule.** Running the formatter through ESLint is slower, gives worse error messages, and duplicates `prettier --check`.
- **Import the flat entry** in ESLint 10 flat config:

```js
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig({
  files: ['**/*.{ts,tsx}'],
  extends: [/* ...presets... */ prettier],
});
```

- **Do not delete your own formatting config after adding `eslint-config-prettier`.** It disables ESLint rules; it does not configure Prettier. The two configs remain separate and both are still needed.
- **See [eslint.md](./eslint.md)** for the full flat-config structure.

---

## 6. Scripts & Editor

- **`"format": "prettier --write ."`** and **`"format:check": "prettier --check ."`** as the two scripts. CI runs `check`, never `write`.
- **Infer the project root** with `--ignore-unknown` so `prettier .` does not choke on binaries and lockfiles.
- **Cache in CI with `--cache` plus `--cache-strategy metadata`** (or `content`) — it makes repeat runs on unchanged files close to free.
- **VS Code: `editor.defaultFormatter: "esbenp.prettier-vscode"` and `editor.formatOnSave: true`,** scoped to the languages you want Prettier to own. A formatter fight in the editor is the local equivalent of the CI problem.
- **Format on save, not on commit** — the commit hook should be a no-op safety net, not the primary trigger.

---

## 7. Speed

- **Prettier 3.9 is still JavaScript on Node.** It is fast enough for most repos and slower than Rust-based alternatives on very large trees.
- **An experimental OXC-based CLI shipped in 3.6** (`--experimental-cli`), and `@prettier/plugin-oxc` / `@prettier/plugin-hermes` exist as alternative parser backends. Treat these as opt-in experiments: benchmark on your own repo before standardising on them, and expect output differences while they stabilise.
- **If formatting is genuinely your CI bottleneck,** that is a signal to evaluate [biome.md](./biome.md) — but measure the whole pipeline first, not the formatter in isolation.

---

## 8. Migrating to Biome (or Back)

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
