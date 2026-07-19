# Ratatui Design Best Practices: Starter Template

A reusable starting point derived from the **3. Layout Constraints** section of [Ratatui Design Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```rust
let chunks = Layout::default()
    .direction(Direction::Vertical)
    .constraints([
        Constraint::Length(3),   // header
        Constraint::Min(0),      // body
        Constraint::Length(1),   // status bar
    ])
    .split(frame.area());
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
