# Workflow notes

Focused reference for **neovim-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. LSP: Diagnostics from the Project

- **Wire the language server to the project's own toolchain** — `ts_ls` from `node_modules`, `rust-analyzer` from the toolchain, `pyright` for Python. Neovim's bundled servers lag the version the build uses, which produces diagnostics the compiler disagrees with.
- **The `null-ls`/built-in LSP client is a bridge, not an authority.** Formatting and linting should call the project's `prettier`, `eslint`, `ruff`, `gofmt` binaries; a reimplementation will disagree.
- **One formatter per filetype, configured explicitly** (`formatters_by_ft = { "typescript" = { "prettier" } }`). A silent default means the wrong tool sometimes wins.
- **`tsc --noEmit`, `cargo check`, and the test runner are the authority in CI,** not the buffer diagnostics — the editor analyses an open project graph and skips some checks.
- **Set the workspace root to the repository root** for a monorepo, or cross-package resolution breaks and the errors are phantom.
- **Diagnostics are useful immediately on open**; do not wait for the server to fully index before saving.

---

## 3. Editing Workflow

- **Learn the motions properly** (`w`, `b`, `e`, `0`, `$`, `f`, `t`, `;`, `,`, `ci"`, `di(`, `va"`). Speed comes from not thinking about navigation; a half-learned motion set is slower than typing.
- **`nvim-treesitter` for structural selection and navigation,** and it is the reason `ci"` and `if` work at all. A language without a parser falls back to regex, which is subtly wrong.
- **Incremental search (`/`, `?`) and `:s` with a visual selection** beat macros for most edits; reserve macros for genuinely repeated multi-line transformations.
- **Undo is a tree (`g-` / `gq` with `undotree`), not a stack.** This is the single feature that most improves trust in an editor for large refactors.
- **Use `:checktime` or a focus-events plugin** to notice externally changed files; Neovim does not prompt for this by default and a silent reload can lose work.

---
