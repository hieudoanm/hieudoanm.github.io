# Plotly.js Best Practices: Workflow Checklist

A practical run sheet for applying [Plotly.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Traces & Layout: **Traces are typed and explicit — one trace per series:**
- [ ] 1. Traces & Layout: **Multi-trace: distinct name/mode/line.color per series; stacked/bars via barmode.**
- [ ] 2. Updating: **Plotly.react(div, data, layout) — diffing update (preserves state, fast):**
- [ ] 2. Updating: **Plotly.restyle/Plotly.relayout for sparse attribute updates (single trace color, axis range).**
- [ ] 3. Performance for Large Data: **type: "scattergl" / scatter3d/WebGL renderers for 100k+ points:**
- [ ] 3. Performance for Large Data: **Down-sample/fps keep interactivity: layout.dragmode/toggle mindful of re-plotting.**
- [ ] 4. Config & Interactivity: **The config object gates UI chrome:**
- [ ] 4. Config & Interactivity: **scrollZoom/dragmode/hovermode per purpose; toImage scale for exports.**
- [ ] 5. Interaction & Events: **plotly_click/plotly_hover/plotly_selected events drive cross-chart linking:**
- [ ] 5. Interaction & Events: **Selection via plotly_selected/event.points read-backs — coupled cross-filter computed in the handler.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
