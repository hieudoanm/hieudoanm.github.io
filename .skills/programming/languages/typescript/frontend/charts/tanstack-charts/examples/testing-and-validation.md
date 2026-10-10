# TanStack Charts Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Series/axes structured per axis semantics; data typed
- [ ] Chart built declaratively; renderer chosen (canvas/SVG)
- [ ] Axes with `scaleType` + formatted ticks
- [ ] Colors/grid themed centrally; consistent palette
- [ ] `updateOptions` for refreshes; `destroy()` on unmount
- [ ] Down-sampled series; bulk options built once

## Example

A team applying **Quick-Start Checklist** to a TanStack Charts Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Series/axes structured per axis semantics; data typed**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for tanstack-charts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
