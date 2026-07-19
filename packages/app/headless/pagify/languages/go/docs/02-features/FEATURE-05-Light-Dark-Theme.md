# pagify — FEATURE-05: Light/Dark Theme

## 1. Summary

The default theme supports light and dark modes with a toggle.

## 2. Behaviour

- `default/styles.css` defines design tokens including dark-mode overrides.
- `default/script.js` toggles the theme and persists the preference.
- The toggle is progressive enhancement; the site is readable without it.

## 3. Acceptance criteria

- Theme toggle switches between light and dark appearance.
- Preference persists across page loads.
- No flash of incorrect theme on load.
