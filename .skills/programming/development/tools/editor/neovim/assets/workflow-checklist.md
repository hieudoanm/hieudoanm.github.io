# Neovim: Workflow Checklist

A practical run sheet for applying [Neovim](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Config & Reproducibility: **Write the config in Lua, and keep it in a repository you can clone** — dotfiles as a git repo, or a project-local .nvim/. A config that only exists in one machine is not reproducible and not reviewable
- [ ] 1. Config & Reproducibility: **Pin your Neovim version** (a release tag, or a version manager) — plugin APIs change between minor versions, and "works on my machine" is usually a version difference
- [ ] 2. LSP: Diagnostics from the Project: **Wire the language server to the project's own toolchain** — ts_ls from node_modules, rust-analyzer from the toolchain, pyright for Python. Neovim's bundled servers lag the version the build uses, which produces diagnostics the compiler disagrees with
- [ ] 2. LSP: Diagnostics from the Project: **The null-ls/built-in LSP client is a bridge, not an authority.** Formatting and linting should call the project's prettier, eslint, ruff, gofmt binaries; a reimplementation will disagree
- [ ] 4. Fuzzy Finding & Project Navigation: **telescope.nvim (or fzf-based pickers) for files, symbols, and references** is the core of the navigation workflow. Without it, project navigation falls back to :grep, which is where the slowness comes from
- [ ] 4. Fuzzy Finding & Project Navigation: **ripgrep (rg) is the search backend**; make sure it is installed — Telescope is only as good as the binary underneath it
- [ ] 5. Formatting, Linting, and Git: **Format on save, from the project's configured tool, with a confirmation off.** If saving reformats in a way CI disagrees with, the fix is to align the config, not to disable the formatter
- [ ] 5. Formatting, Linting, and Git: **Keep git integration light** — fugitive or a diff view is enough. Anything that will be permanent in history (rebase, bisect, reflog surgery) belongs in the terminal, typed deliberately
- [ ] 6. Performance & Maintenance: **lazy = true on plugins that need not load at startup** is the main startup-time lever; measure with :Lazy profile before optimising further
- [ ] 6. Performance & Maintenance: **Treesitter parsers and LSP servers are the main resident-memory cost.** A project with many language servers open will use more memory than the editor needs; close servers for languages not in use

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
