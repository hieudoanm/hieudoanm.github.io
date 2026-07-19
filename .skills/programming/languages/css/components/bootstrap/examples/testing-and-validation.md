# Bootstrap: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Install via npm or CDN; import CSS + JS bundle.
- [ ] Set up responsive container/row/col structure per layout.
- [ ] Theme via Sass variables (primary color, spacing, radii).
- [ ] Use components with proper `data-bs-*` and accessibility attributes.
- [ ] Verify dark-mode and contrast via `data-bs-theme`.
- [ ] Test breakpoints: xs→xxl on real widths.

## Example

A team applying **Quick-Start Checklist** to a Bootstrap project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Install via npm or CDN; import CSS + JS bundle.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for bootstrap.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
