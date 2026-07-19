# Bulma: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Add Bulma via CDN or npm; import CSS.
- [ ] Build layout with `.columns`/`.column` and containers.
- [ ] Use components with proper modifier classes (`is-*`).
- [ ] Add JS for interactive components (navbar burger, modal, dropdown).
- [ ] Theme key variables via Sass if compiling yourself.
- [ ] Test responsive toggles and mobile layouts.

## Example

A team applying **Quick-Start Checklist** to a Bulma project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Add Bulma via CDN or npm; import CSS.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for bulma.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
