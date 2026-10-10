# Neovim: Basic Usage

Best practices for Neovim — lazy plugin management with lazy.nvim, project config in Lua, LSP and formatting wired to project tools, telescope/fzf workflow, and a reproducible setup. Use when configuring or working in Neovim.

## Scenario

Use this example as a starting point when applying **neovim-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Config & Reproducibility** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```lua
-- lazy-lock.json is committed; specs are declarative
{
  { "neovim/nvim-lspconfig", commit = "<pinned>" },
  { "neovim/nvim-treesitter", commit = "<pinned>" },
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
