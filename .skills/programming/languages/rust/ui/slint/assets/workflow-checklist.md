# Slint + Material Design Best Practices: Workflow Checklist

A practical run sheet for applying [Slint + Material Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup
- [ ] 7. Components: Use `std-widgets.slint` First: Button — has primary: true property for the filled/prominent Material button variant; leave false for a text/outlined-style secondary action
- [ ] 7. Components: Use `std-widgets.slint` First: LineEdit — already implements Material's filled text-field look; don't rebuild input styling from scratch
- [ ] 8. Layout: Use VerticalLayout / HorizontalLayout with spacing and padding set from the Spacing tokens rather than manual x/y positioning
- [ ] 8. Layout: Use GridLayout for form-like or dashboard content
- [ ] 9. General Rules of Thumb: **Don't fight the Material style** — overriding every widget's colors/shapes individually usually looks worse than adjusting the Palette globally
- [ ] 9. General Rules of Thumb: **Test both material-light and material-dark** — set via SLINT_STYLE — before shipping

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
