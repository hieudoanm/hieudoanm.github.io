# Ratatui Design Best Practices: 4. Borders & Blocks

## Source guidance

This example applies the **4. Borders & Blocks** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

`Block` is your primary container — use it far more than raw widget rendering:
- Pick `BorderType::Rounded` for a modern look, `Plain` for density/technical tools — use one consistently.
- Pad title text with a leading/trailing space (`" Files "`) — bare text against the border looks cramped.
- Change border color/weight for the focused pane in multi-pane apps — this is the single most important affordance in Ratatui apps and is frequently skipped.

## Example

```rust
let block = Block::default()
    .title(" Files ")
    .borders(Borders::ALL)
    .border_type(BorderType::Rounded)
    .border_style(Style::default().fg(if focused { theme.border_focused } else { theme.border }))
    .style(Style::default().bg(theme.surface));
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for ratatui-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
