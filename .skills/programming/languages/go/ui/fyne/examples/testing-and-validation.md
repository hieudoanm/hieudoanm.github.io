# Fyne Design Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Fyne Design Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Custom `fyne.Theme` implemented (colors for both variants)
- [ ] Padding token increased from default 4 → 8
- [ ] Window content wrapped in `container.NewPadded`
- [ ] App shell uses `container.NewBorder`, not nested boxes
- [ ] Related controls grouped in `widget.NewCard`
- [ ] Text hierarchy defined (title/heading/body/caption sizes)
- [ ] Icons added to primary action buttons

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
