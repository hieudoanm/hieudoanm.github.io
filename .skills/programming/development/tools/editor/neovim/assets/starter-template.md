# Neovim: Starter Template

A reusable starting point derived from the **1. Config & Reproducibility** section of [Neovim](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```lua
-- lazy-lock.json is committed; specs are declarative
{
  { "neovim/nvim-lspconfig", commit = "<pinned>" },
  { "neovim/nvim-treesitter", commit = "<pinned>" },
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
