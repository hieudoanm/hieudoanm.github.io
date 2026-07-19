# Review checklist

Focused reference for **neovim-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
