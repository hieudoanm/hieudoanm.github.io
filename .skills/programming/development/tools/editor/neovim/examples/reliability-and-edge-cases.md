# Neovim: 6. Performance & Maintenance

## Scenario

A project is working on **6. performance & maintenance** for Neovim. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`lazy = true` on plugins that need not load at startup** is the main startup-time lever; measure with `:Lazy profile` before optimising further.
- **Treesitter parsers and LSP servers are the main resident-memory cost.** A project with many language servers open will use more memory than the editor needs; close servers for languages not in use.
- **Update plugins deliberately,** reading the changelog for anything touching the LSP client or a UI plugin, and re-run `:checkhealth` afterwards.
- **A config you cannot explain is a config you cannot fix.** Keep it commented at the level of "why this plugin" rather than "what this key does".

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **6. Performance & Maintenance** section of [SKILL.md](../SKILL.md).
