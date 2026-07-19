---
name: "neovim-best-practices"
description: "Best practices for Neovim — lazy plugin management with lazy.nvim, project config in Lua, LSP and formatting wired to project tools, telescope/fzf workflow, and a reproducible setup. Use when configuring or working in Neovim."
tags:
  - "programming"
  - "development"
  - "developer-tools"
  - "editor"
  - "neovim"
when_to_use: "Use when configuring or working in Neovim."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../antigravity/SKILL.md"
  - "../zed/SKILL.md"
  - "../vscode/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# Neovim

Neovim is a terminal editor whose power comes from composition: a language server, a formatter, a fuzzy finder, and a plugin manager, assembled into a workflow that is fast, keyboard-driven, and entirely defined by a config file. Its cost is the same: **a personal configuration that is a large unreviewed codebase, and an editor that can be subtly broken in a way only a `:checkhealth` run will reveal**. Practical Neovim work is about **making the config reproducible and version-controlled, wiring diagnostics and formatting to the project's own tools, and keeping the plugin set small enough to reason about**. GUI-editor equivalents are in [vscode.md](../vscode/SKILL.md) and [zed.md](../zed/SKILL.md).

_Verified against Neovim 0.10–0.11 era with lazy.nvim, `nvim-lspconfig`, and built-in LSP client. Plugin APIs move; check the current `:checkhealth` output after a jump._

---

## 1. Config & Reproducibility

- **Write the config in Lua, and keep it in a repository you can clone** — `dotfiles` as a git repo, or a project-local `.nvim/`. A config that only exists in one machine is not reproducible and not reviewable.
- **Pin your Neovim version** (a release tag, or a version manager) — plugin APIs change between minor versions, and "works on my machine" is usually a version difference.
- **Use `lazy.nvim` and pin plugin commits,** especially for anything in fast development. An unpinned plugin that changes API will break the config with no diff to explain it.
- **Plugin specs belong in declarative `spec` tables** with `enabled`/`lazy` keys, not imperative `require` calls scattered through the file. The declarative form is what makes `lazy-lock.json` meaningful.
- **Check `:checkhealth` after every jump or config change.** Most "Neovim is broken" reports are a missing dependency, a wrong Lua runtime, or a plugin that needs a build step — all three are reported by health checks and diagnosed nowhere else.

```lua
-- lazy-lock.json is committed; specs are declarative
{
  { "neovim/nvim-lspconfig", commit = "<pinned>" },
  { "neovim/nvim-treesitter", commit = "<pinned>" },
}
```

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

## 4. Fuzzy Finding & Project Navigation

- **`telescope.nvim` (or `fzf`-based pickers) for files, symbols, and references** is the core of the navigation workflow. Without it, project navigation falls back to `:grep`, which is where the slowness comes from.
- **`ripgrep` (`rg`) is the search backend**; make sure it is installed — Telescope is only as good as the binary underneath it.
- **`fzf` with `fzf.vim` is a legitimate alternative** and lighter; pick one, not both, so file finding behaves predictably.
- **Symbols across a monorepo need the workspace root set correctly** (see LSP above); otherwise symbol search silently misses packages.

---

## 5. Formatting, Linting, and Git

- **Format on save, from the project's configured tool, with a confirmation off.** If saving reformats in a way CI disagrees with, the fix is to align the config, not to disable the formatter.
- **Keep `git` integration light** — fugitive or a diff view is enough. Anything that will be permanent in history (rebase, bisect, reflog surgery) belongs in the terminal, typed deliberately.
- **Set `shiftwidth`/`tabsize`/`expandtab` per filetype from the repo's editorconfig** — `editorconfig` support in Neovim reads the committed `.editorconfig`, which is the right source.

---

## 6. Performance & Maintenance

- **`lazy = true` on plugins that need not load at startup** is the main startup-time lever; measure with `:Lazy profile` before optimising further.
- **Treesitter parsers and LSP servers are the main resident-memory cost.** A project with many language servers open will use more memory than the editor needs; close servers for languages not in use.
- **Update plugins deliberately,** reading the changelog for anything touching the LSP client or a UI plugin, and re-run `:checkhealth` afterwards.
- **A config you cannot explain is a config you cannot fix.** Keep it commented at the level of "why this plugin" rather than "what this key does".

---

## General Rules of Thumb

- Config in Lua, in a versioned repo; Neovim version pinned; plugins pinned via `lazy-lock.json`.
- `:checkhealth` after every jump or config change — it is the only real diagnosis tool.
- LSP wired to the project's toolchain; CI's compiler and tests are the authority.
- One formatter per filetype, from the project's own binary; format on save.
- Learn motions and Treesitter before adding plugins; they are what makes the editor fast.
- Telescope + `rg` for navigation; open the monorepo at its root.
- Destructive git operations in the terminal, not the editor.

---

## Quick-Start Checklist

- [ ] Neovim version pinned; config in a versioned dotfiles or `.nvim/` repo
- [ ] `lazy.nvim` with declarative specs and a committed `lazy-lock.json`
- [ ] `:checkhealth` clean after install and after each major change
- [ ] Treesitter parsers installed for every language in the project
- [ ] LSP servers point at the project's toolchain (`node_modules/typescript`, toolchain `rust-analyzer`, `pyright`)
- [ ] Workspace root set to the repository root for a monorepo
- [ ] `formatters_by_ft` names one formatter per filetype, using the project's binary
- [ ] `editorconfig` support enabled so indentation matches the repo
- [ ] `ripgrep` installed; Telescope or fzf configured, not both
- [ ] Undo tree enabled (`g-` / `gq`)
- [ ] External-change detection enabled (`:checktime` or equivalent)
- [ ] `:Lazy profile` measured; heavy plugins lazy-loaded
- [ ] Plugin updates reviewed in the changelog before applying
