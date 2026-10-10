# Stylex: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Add dependencies + Babel/Vite plugin config.
- [ ] Use `stylex.create` + `stylex.props` in components.
- [ ] Define variables/tokens for colors/spacing/typescale.
- [ ] Apply conditional variants via `stylex.props`.
- [ ] Verify build emitted CSS and class names deterministic.
- [ ] Test SSR output (no runtime hydration mismatch).

## Example

A team applying **Quick-Start Checklist** to a Stylex project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Add dependencies + Babel/Vite plugin config.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for stylex.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
