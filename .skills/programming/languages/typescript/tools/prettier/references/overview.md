# Overview

Focused reference for **prettier-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Prettier

Prettier is a **formatter**, not a linter. It parses your code and prints it back with a single canonical style, which is the whole point: it removes an entire category of code review. Practical Prettier work is mostly about **one formatter in the repo, a config that matches the house style, and knowing what Prettier deliberately does not do** — while linting belongs to eslint.md, and the alternative single-tool approach is biome.md.

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
