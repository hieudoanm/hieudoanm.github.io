# Implementation notes

Focused reference for **neovim-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
