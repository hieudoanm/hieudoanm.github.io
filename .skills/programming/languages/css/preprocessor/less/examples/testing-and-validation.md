# Less: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Configure `less-loader`/plugin for your bundler.
- [ ] Define a `variables.less` file with the theme tokens.
- [ ] Write component `.less` files with flat nesting and reusable mixins.
- [ ] Set up `@import` ordering (variables → mixins → components).
- [ ] Compile and lint output; verify in DevTools.
- [ ] Confirm final CSS matches expected size/specificity.

## Example

A team applying **Quick-Start Checklist** to a Less project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Configure `less-loader`/plugin for your bundler.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for less.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
