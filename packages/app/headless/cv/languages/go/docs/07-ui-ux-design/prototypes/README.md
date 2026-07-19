# Prototypes

UI prototypes and mockups.

Interactive HTML previews of the kevin GUI (fyne key/value manager), styled
with Material Design 3 in light and dark themes:

- `html/00-components.html` — Material Design 3 colour tokens, typography,
  buttons, chips, cards, fields, table, and states.
- `html/01-gui.html` — key/value manager window (control bar, key/value table,
  status bar).

Screenshots are generated with Playwright:

    ./screenshot.sh

Requires Python 3.12+, `uv`, and the Chromium browser (`uv run playwright install
chromium`). Output is written to `images/light/` and `images/dark/`.
