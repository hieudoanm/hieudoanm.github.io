# Review checklist

Focused reference for **ratatui-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

- Use `List` with `.highlight_style()` and `.highlight_symbol("▶ ")` for selectable items rather than manually rendering `Paragraph` per row.
- Use `Table` for tabular data with `.header()` styled distinctly (bold, different background) from body rows.
- Use `Gauge` or `LineGauge` for progress, `Sparkline` for compact trend data.
- Use `Tabs` widget for top-level navigation instead of custom text-based tab bars.
- Use `Paragraph` with `.wrap(Wrap { trim: true })` for any body text that might overflow — unwrapped text silently clips in Ratatui.

---

## 7. Focus & Interaction Feedback

- Maintain an explicit `Focus` enum in app state; every focusable `Block` reads from it to pick border style.
- Show a status/help line listing key bindings for the current mode (e.g. `q quit · ↑↓ navigate · enter select`).
- For async work, render a spinner (`throbber-widgets-tui`) or a `Gauge` — never leave the frame static during a network/file operation.

---

## 8. General Rules of Thumb

- **Redraw only on change** (event-driven `tick`/`poll`) rather than a tight render loop, to avoid flicker and CPU burn.
- **Test at 80x24** minimum in addition to your dev terminal size.
- **One border style, one accent color, one highlight style** — reused everywhere for consistency.
- **Keep render functions pure** — pass `&Theme` and `&AppState` in, don't mutate state during drawing.

---

## Quick-Start Checklist

- [ ] `Theme` struct defined once, threaded through render calls
- [ ] Layout built from `Constraint`s, recomputed from `frame.area()` each frame
- [ ] Status/help bar reserved at bottom (`Constraint::Length(1)`)
- [ ] Every panel wrapped in a `Block` with consistent `BorderType`
- [ ] Focused panel visually distinct from unfocused
- [ ] Titles padded with spaces inside border text
- [ ] Text uses `Paragraph` with `Wrap` where overflow is possible
- [ ] Spinner/gauge shown for any async operation
