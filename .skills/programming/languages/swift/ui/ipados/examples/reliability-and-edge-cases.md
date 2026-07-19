# iPadOS Development: Common Pitfalls

## Scenario

A project is working on **common pitfalls** for iPadOS Development. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Branching on `userInterfaceIdiom` or hardcoding device widths.** It is no longer meaningful; iPhone apps run on iPad as fully resizable.
- **Forcing `columnVisibility = .all`.** It overlays the sidebar in compact width instead of letting the framework collapse.
- **Assuming a fixed window size** or caching geometry at launch.
- **Doing heavy work on every resize step** without checking `isInteractivelyResizing`.
- **Building a custom title bar** without accounting for the new window controls.
- **Ignoring tiny windows** — users can shrink below iPhone SE dimensions and your layout must degrade honestly.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Common Pitfalls** section of [SKILL.md](../SKILL.md).
