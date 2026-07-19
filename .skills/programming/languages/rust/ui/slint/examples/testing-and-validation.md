# Slint + Material Design Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `SLINT_STYLE` explicitly set to `material-light`/`material-dark`
- [ ] Colors sourced from `Palette` or a single custom color global, not scattered hex literals
- [ ] Spacing values pulled from an 8px-based token set
- [ ] Elevation (drop-shadow) used to distinguish background / card / dialog levels
- [ ] Corner radii limited to one small consistent set
- [ ] Type roles limited to 3 per screen (title/body/caption)
- [ ] `std-widgets.slint` components used before custom-built ones

## Example

A team applying **Quick-Start Checklist** to a Slint + Material Design Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `SLINT_STYLE` explicitly set to `material-light`/`material-dark`**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for slint-material-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
