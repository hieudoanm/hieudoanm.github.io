# TanStack Charts Best Practices: Workflow Checklist

A practical run sheet for applying [TanStack Charts Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. The Data Model: **Timeline data with causal keys; per-axis series mapped:**
- [ ] 1. The Data Model: **Align data length/dimensions with axes; typed series data via generics.**
- [ ] 2. Chart & Options: **Create a chart via builder; render with your renderer (canvas/SVG):**
- [ ] 2. Chart & Options: **Options model: series, axes, grid/edit via chart.setOptions:**
- [ ] 3. Axes & Layout: **Axes declared per orientation (x0/y0), with scale + formatters:**
- [ ] 3. Axes & Layout: **scaleType semantic (band/time/linear); ticks formatted, never raw floats.**
- [ ] 4. Themes & Styling: **Rendering via your layer — theme = your invariables:**
- [ ] 4. Themes & Styling: **App palette centralized; style consistently across chart types.**
- [ ] 5. Updates & Lifecycle: **chart.updateOptions(...) for reactive changes (data/axes/theme):**
- [ ] 5. Updates & Lifecycle: **chart.destroy() on unmount; re-render via your rendering layer after option changes.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
