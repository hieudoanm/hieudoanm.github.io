# Overview

Focused reference for **neovim-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Neovim

Neovim is a terminal editor whose power comes from composition: a language server, a formatter, a fuzzy finder, and a plugin manager, assembled into a workflow that is fast, keyboard-driven, and entirely defined by a config file. Its cost is the same: **a personal configuration that is a large unreviewed codebase, and an editor that can be subtly broken in a way only a `:checkhealth` run will reveal**. Practical Neovim work is about **making the config reproducible and version-controlled, wiring diagnostics and formatting to the project's own tools, and keeping the plugin set small enough to reason about**. GUI-editor equivalents are in vscode.md and zed.md.

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
