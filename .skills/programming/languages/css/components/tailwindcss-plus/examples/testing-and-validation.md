# Tailwindcss Plus: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `npm i tailwindcss` and import `@import "tailwindcss";` in CSS.
- [ ] Declare `@theme` tokens (colors, fonts, spacing) — no config file needed.
- [ ] Build UI with utilities + variants.
- [ ] Add container queries for component-responsive layouts.
- [ ] Configure dark mode and verify variants.
- [ ] Build to confirm small output and no missing classes.

## Example

A team applying **Quick-Start Checklist** to a Tailwindcss Plus project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `npm i tailwindcss` and import `@import "tailwindcss";` in CSS.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for tailwindcss-plus.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
