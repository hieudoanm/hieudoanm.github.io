# Uikit: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Add CSS + JS (+ icons JS) assets.
- [ ] Build layout: containers, flex/grid utilities, sections.
- [ ] Use components via `uk-*` attributes.
- [ ] Initialize via `UIkit.*` API where custom behavior is needed.
- [ ] Theme with Sass variables; keep bundle lean.
- [ ] Verify modal/offcanvas/slider on mobile.

## Example

A team applying **Quick-Start Checklist** to a Uikit project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Add CSS + JS (+ icons JS) assets.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for uikit.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
