# Ratatui Design Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Ratatui Design Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `Theme` struct defined once, threaded through render calls
- [ ] Layout built from `Constraint`s, recomputed from `frame.area()` each frame
- [ ] Status/help bar reserved at bottom (`Constraint::Length(1)`)
- [ ] Every panel wrapped in a `Block` with consistent `BorderType`
- [ ] Focused panel visually distinct from unfocused
- [ ] Titles padded with spaces inside border text
- [ ] Text uses `Paragraph` with `Wrap` where overflow is possible

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
