# Ratatui Design Best Practices: 3. Layout Constraints

## Source guidance

This example applies the **3. Layout Constraints** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Ratatui's `Layout` is constraint-based — get this right and everything else follows:
**Rules of thumb:**
- Always leave 1 row for a status/help bar at the bottom — huge usability win for near-zero cost.
- Recompute layout every frame from `frame.area()` — never cache terminal size.
- Nest `Layout` calls for grids (outer vertical split, inner horizontal split per row).

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for ratatui-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
