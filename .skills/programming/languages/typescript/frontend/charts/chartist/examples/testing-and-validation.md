# Chartist Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Chartist Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Constructor per chart with data + options; reference kept
- [ ] Series styling via `.ct-*` CSS classes; palette consistent
- [ ] `fullWidth`/responsive; axisScale (`low`/`high`) explicit
- [ ] Animation via CSS/draw hook (lightweight only)
- [ ] `chart.update()`/`detach()` lifecycle; no recreate storms
- [ ] Freeze-status documented; migration path if charts grow

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
