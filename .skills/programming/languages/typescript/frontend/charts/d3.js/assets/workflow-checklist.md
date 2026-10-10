# D3 Best Practices: Workflow Checklist

A practical run sheet for applying [D3 Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Selections: **Chain selections explicitly; one target per selection:**
- [ ] 1. Selections: **.select/.selectAll semantics: first match vs all matches — choose deliberately.**
- [ ] 2. Data Joins (General Update Pattern): **The core mental model: join + enter + update + exit:**
- [ ] 2. Data Joins (General Update Pattern): **A stable key function (.data(data, d => d.id)) enables animated updates.**
- [ ] 3. Scales & Axes: **Scales map data → pixels; the contract of the chart:**
- [ ] 3. Scales & Axes: **scaleBand/scaleOrdinal for categorical; stroke/color via scale where relevant.**
- [ ] 4. SVG Structure: **Groups (<g>) per layer: margins created once:**
- [ ] 4. SVG Structure: **Plot layers separated (grid, axes, series, labels) for reuse; geometric elements typed (path/circle/line/rect).**
- [ ] 5. Interaction & Re-render: **Bind events in enter/update; pointer over mouse handlers where possible:**
- [ ] 5. Interaction & Re-render: **d3-zoom/d3-drag as behavior modules — compose, don't hand-roll transforms.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
