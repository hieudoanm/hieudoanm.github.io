# Tailwindcss: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Install + configure `content` globs + PostCSS.
- [ ] Define brand colors/fonts in `theme.extend`.
- [ ] Build the UI with utilities and variants in markup.
- [ ] Extract repeated patterns into components.
- [ ] Configure dark mode strategy appropriately.
- [ ] Build prod; verify output size and class coverage.

## Example

A team applying **Quick-Start Checklist** to a Tailwindcss project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Install + configure `content` globs + PostCSS.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for tailwindcss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
