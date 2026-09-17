# Bubble Tea Design Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Colors defined once as `AdaptiveColor` constants
- [ ] Consistent border style (rounded or normal) app-wide
- [ ] Outer padding applied to root view, not raw text
- [ ] Focused vs unfocused panels visually distinct
- [ ] Title/header styled with bold + primary color
- [ ] Help/status bar present with key bindings
- [ ] Spinner/progress shown for any operation >300ms

## Example

A team applying **Quick-Start Checklist** to a Bubble Tea Design Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Colors defined once as `AdaptiveColor` constants**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for bubbletea-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
