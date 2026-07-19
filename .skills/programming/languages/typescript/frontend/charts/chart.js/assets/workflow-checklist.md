# Chart.js Best Practices: Workflow Checklist

A practical run sheet for applying [Chart.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Creating & Lifecycle: **One chart per canvas; new Chart(canvas, config); destroy on teardown:**
- [ ] 1. Creating & Lifecycle: **Chart.getChart(canvas) before re-creating — update, don't duplicate.**
- [ ] 2. Datasets & Colors: **Datasets self-describing: label, data, type (mixing), fill/color explicit:**
- [ ] 2. Datasets & Colors: **Palette consistent across charts (centralize colors); fill deliberate (area vs line).**
- [ ] 3. Scales & Axes: **Scales config in options.scales — x/y objects with ticks, title, min/max:**
- [ ] 3. Scales & Axes: **beginAtZero/suggestedMin per semantics; time scale via time adapter for date axes.**
- [ ] 4. Responsive & Layout: **responsive: true default; maintainAspectRatio: false + a sized parent:**
- [ ] 4. Responsive & Layout: **Canvas inside a fixed-height container; call chart.resize() on container resize for SPA frameworks.**
- [ ] 5. Plugins & Interaction: **Plugins extend: tooltip, legend, custom draw (delayed):**
- [ ] 5. Plugins & Interaction: **Custom plugins registered once (module scope), not per-chart.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
