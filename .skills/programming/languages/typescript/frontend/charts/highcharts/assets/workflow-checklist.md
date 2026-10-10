# Highcharts Best Practices: Workflow Checklist

A practical run sheet for applying [Highcharts Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Creating Charts: **chart(container, options) with declarative config:**
- [ ] 1. Creating Charts: **Series typed per semantic (line/column/area/pie); data arrays same length as axis labels.**
- [ ] 2. Configuration & Series: **Series/axes/legend/tooltip each configurable; options are documentation:**
- [ ] 2. Configuration & Series: **plotOptions for shared series defaults; per-series overrides on top.**
- [ ] 3. Modules & Add-ons: **Load only what's used (highcharts-more, exporting, heatmap, stock):**
- [ ] 3. Modules & Add-ons: **Tree-shake modules in builds; watch license/version notes per module.**
- [ ] 4. Accessibility & Themes: **Built-in a11y module: accessibility: { enabled: true }; describe charts:**
- [ ] 4. Accessibility & Themes: **<title>/desc via options (chart.description) for the SR; focus visible.**
- [ ] 5. Interaction & Refreshing: **chart.update({series: [...]}) for data refresh — no recreate churn:**
- [ ] 5. Interaction & Refreshing: **chart.destroy() on teardown; events (chart.events.load) for hooks.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
