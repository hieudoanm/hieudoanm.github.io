# Sass: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Install `sass` and wire into your bundler (Vite/webpack/CLI).
- [ ] Organize files: variables, mixins, functions, components, `index.scss`.
- [ ] Replace any legacy `@import` with `@use`/`@forward`.
- [ ] Standardize breakpoints in a `$breakpoints` map + `respond-to` mixin.
- [ ] Compile and inspect output size and selector specificity.
- [ ] Run a lint/format check (stylelint) on generated CSS.

## Example

A team applying **Quick-Start Checklist** to a Sass project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Install `sass` and wire into your bundler (Vite/webpack/CLI).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for sass.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
