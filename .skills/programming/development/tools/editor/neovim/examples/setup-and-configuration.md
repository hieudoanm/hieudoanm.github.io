# Neovim: 1. Config & Reproducibility

## Scenario

A project is working on **1. config & reproducibility** for Neovim. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Write the config in Lua, and keep it in a repository you can clone** — `dotfiles` as a git repo, or a project-local `.nvim/`. A config that only exists in one machine is not reproducible and not reviewable.
- **Pin your Neovim version** (a release tag, or a version manager) — plugin APIs change between minor versions, and "works on my machine" is usually a version difference.
- **Use `lazy.nvim` and pin plugin commits,** especially for anything in fast development. An unpinned plugin that changes API will break the config with no diff to explain it.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Config & Reproducibility** section of [SKILL.md](../SKILL.md).
