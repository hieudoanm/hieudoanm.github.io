# Neovim: Validation Plan

Use this plan to verify work guided by [Neovim](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **lazy = true on plugins that need not load at startup** is the main startup-time lever; measure with :Lazy profile before optimising further
- [ ] **Treesitter parsers and LSP servers are the main resident-memory cost.** A project with many language servers open will use more memory than the editor needs; close servers for languages not in use
- [ ] **Update plugins deliberately,** reading the changelog for anything touching the LSP client or a UI plugin, and re-run :checkhealth afterwards
- [ ] **A config you cannot explain is a config you cannot fix.** Keep it commented at the level of "why this plugin" rather than "what this key does"

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
