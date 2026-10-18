# Prototypes

UI prototypes and mockups.

Interactive HTML previews of the kevin GUI (fyne key/value manager), styled
with Material Design 3 in light and dark themes:

- `html/00-components.html` — Material Design 3 colour tokens, typography,
  buttons, chips, cards, fields, table, and states.
- `html/01-gui.html` — interactive key/value manager window mirroring
  `internal/gui`: control bar, six-column key/value table, status bar,
  search-as-you-type, select-to-edit, confirm dialogs, 80-rune value
  truncation, and the 500 ms re-render tick.

Screenshots are generated with Playwright:

    ./screenshot.sh

Requires Python 3.12+, `uv`, and the Chromium browser (`uv run playwright install
chromium`). Output is written to `images/light/` and `images/dark/`.
