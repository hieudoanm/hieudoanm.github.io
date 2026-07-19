# Review checklist

Focused reference for **bubbletea-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

- Use `bubbles/key` to define bindings with a `Help()` method — this auto-populates a help view instead of a static hardcoded string.
- Always support `q` / `ctrl+c` to quit, `?` to toggle help, and arrow keys + vim-style `j/k` for navigation where lists are involved.
- Show current mode/context in the header or status line (e.g. "NORMAL", "EDITING", "FILTER") if the app has modal input like Vim-style TUIs.

---

## 8. Motion & Feedback

- Use `bubbles/spinner` for any operation >300ms (network calls, file I/O) — a frozen screen reads as broken.
- Use `bubbles/progress` for determinate long operations.
- Debounce/animate list filtering rather than snapping instantly if using fuzzy search — smoother perceived responsiveness.

---

## 9. General Rules of Thumb

- **Test at 80x24** (classic minimum) as well as your dev terminal size — don't assume a large window.
- **Never rely on 256-color-only codes** if targeting broad compatibility — Lip Gloss auto-downgrades gracefully, but test with `TERM=xterm` occasionally.
- **Keep the update loop pure** — all styling happens in `View()`, not `Update()`.
- **One consistent border radius/style and one accent color** — the most common mistake is inconsistent styling across different screens/panels of the same app.

---

## Quick-Start Checklist

- [ ] Colors defined once as `AdaptiveColor` constants
- [ ] Consistent border style (rounded or normal) app-wide
- [ ] Outer padding applied to root view, not raw text
- [ ] Focused vs unfocused panels visually distinct
- [ ] Title/header styled with bold + primary color
- [ ] Help/status bar present with key bindings
- [ ] Spinner/progress shown for any operation >300ms
- [ ] Layout responds to `tea.WindowSizeMsg` (no hardcoded dimensions)
