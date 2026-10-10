# Daisyui: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Install and register the plugin in Tailwind config.
- [ ] Define themes (or use built-ins) and pick default + dark.
- [ ] Build UI with component/utility classes.
- [ ] Add aria + interaction statements for toggles/modals.
- [ ] Test JIT output size; confirm classes generated.

## Example

A team applying **Quick-Start Checklist** to a Daisyui project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Install and register the plugin in Tailwind config.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for daisyui.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
