# Implementation notes

Focused reference for **prettier-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
- **See eslint.md** for the full flat-config structure.

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
- **If formatting is genuinely your CI bottleneck,** that is a signal to evaluate biome.md — but measure the whole pipeline first, not the formatter in isolation.

---

## 8. Migrating to Biome (or Back)
