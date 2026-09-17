# Unocss: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Install and register UnoCSS (Vite/Nuxt); import `virtual:uno.css`.
- [ ] Configure `content` globs and presets (`preset-wind`, `preset-icons`, etc.).
- [ ] Define theme tokens, rules, shortcuts.
- [ ] Build UI with atomic classes.
- [ ] Verify icon preset requires your icon-package (`@iconify-json/...`).
- [ ] Confirm production CSS size and used-content correctness.

## Example

A team applying **Quick-Start Checklist** to a Unocss project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Install and register UnoCSS (Vite/Nuxt); import `virtual:uno.css`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for unocss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
