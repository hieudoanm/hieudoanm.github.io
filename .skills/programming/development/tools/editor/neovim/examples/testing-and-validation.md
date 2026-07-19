# Neovim: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Neovim. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Neovim version pinned; config in a versioned dotfiles or `.nvim/` repo
- [ ] `lazy.nvim` with declarative specs and a committed `lazy-lock.json`
- [ ] `:checkhealth` clean after install and after each major change
- [ ] Treesitter parsers installed for every language in the project
- [ ] LSP servers point at the project's toolchain (`node_modules/typescript`, toolchain `rust-analyzer`, `pyright`)
- [ ] Workspace root set to the repository root for a monorepo
- [ ] `formatters_by_ft` names one formatter per filetype, using the project's binary

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
