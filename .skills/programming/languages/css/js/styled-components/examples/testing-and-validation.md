# Styled Components: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Install and add the Babel plugin for development ergonomics.
- [ ] Build components with `styled.*` and dynamic props.
- [ ] Add `<ThemeProvider>` + typed theme.
- [ ] Add `createGlobalStyle` and `keyframes` where needed.
- [ ] Configure SSR style-sheet extraction or hydration.
- [ ] Verify no server/client class mismatch.

## Example

A team applying **Quick-Start Checklist** to a Styled Components project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Install and add the Babel plugin for development ergonomics.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for styled-components.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
