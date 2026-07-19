# Materializecss: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Add CSS + JS assets; include Material Icons (if used).
- [ ] Build layout using the grid; add components.
- [ ] Initialize widgets `M.AutoInit()` (or constructors).
- [ ] Theme key colors via Sass overrides.
- [ ] Verify modal/sidenav/dropdown/datepickers behave at viewports.

## Example

A team applying **Quick-Start Checklist** to a Materializecss project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Add CSS + JS assets; include Material Icons (if used).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for materializecss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
