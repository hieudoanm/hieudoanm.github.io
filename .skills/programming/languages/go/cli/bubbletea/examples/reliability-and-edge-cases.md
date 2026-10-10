# Bubble Tea Design Best Practices: 4. Borders & Containers

## Source guidance

This example applies the **4. Borders & Containers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Use `lipgloss.RoundedBorder()` for a modern feel; `lipgloss.NormalBorder()` for a denser/technical feel. Pick one and use it consistently app-wide.
- Group related content in a bordered box rather than relying on blank-line separation alone.
- For panels side-by-side, use `lipgloss.JoinHorizontal(lipgloss.Top, left, right)`; for stacked sections, `lipgloss.JoinVertical(lipgloss.Left, ...)`.
- Give focused panels a distinct border color (primary) vs unfocused (muted gray) — critical for multi-pane layouts so the user knows where input goes.

## Example

```go
focusedBorder   = ColorPrimary
unfocusedBorder = ColorBorder
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for bubbletea-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
