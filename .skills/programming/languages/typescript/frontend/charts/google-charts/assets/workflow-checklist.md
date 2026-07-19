# Google Charts Best Practices: Workflow Checklist

A practical run sheet for applying [Google Charts Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Loading & Bootstrap: **Static loader + callback — render only after load:**
- [ ] 1. Loading & Bootstrap: **Load packages you use (corechart, bar, line, pie, table…).**
- [ ] 2. DataTable Semantics: **Typed columns over raw arrays:**
- [ ] 2. DataTable Semantics: **addRole/{ role: "style" } columns for per-point styling; group/filter for view transforms.**
- [ ] 3. Charts & Options: **Pick the class per semantics; render with explicit options:**
- [ ] 3. Charts & Options: **Options per chart family (isStacked, pieHole, curveType) — validate at render.**
- [ ] 4. Events & Interaction: **google.visualization.events.addListener(chart, "select", fn) for selection:**
- [ ] 4. Events & Interaction: **getSelection()/data.getValue(row, col) read-backs — state at the chart, not the DOM text.**
- [ ] 5. Responsive & Re-render: **Chart needs a parent width; re-draw on container resize (debounced):**
- [ ] 5. Responsive & Re-render: **Redraw = chart.draw(newOptions) (or google.visualization.events.trigger on ready).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
