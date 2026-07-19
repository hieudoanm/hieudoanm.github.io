# Chart.js Best Practices

Chart.js renders **canvas-based charts in the browser** — new Chart(ctx, {...}) with datasets, scales, and options; responsive out of the box. Practical Chart.js leans on **a Chart-controller registry reuse pattern (Chart.getChart(element)), structured datasets with explicit colors/fill, option placement correct (global vs scales vs plugins), and destroy/update lifecycle discipline** — the canvas is the target; manage...

## When to use

Use when writing, structuring, or reviewing Chart.js.

## Core topics

- 1. Creating & Lifecycle
- 2. Datasets & Colors
- 3. Scales & Axes
- 4. Responsive & Layout
- 5. Plugins & Interaction
- 6. Performance

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Chart.js Best Practices: Basic Usage](./examples/basic-usage.md)
- [Chart.js Best Practices: 6. Performance](./examples/reliability-and-edge-cases.md)
- [Chart.js Best Practices: 2. Datasets & Colors](./examples/setup-and-configuration.md)
- [Chart.js Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Chart.js Best Practices: Decision Record](./assets/decision-record.md)
- [Chart.js Best Practices: Starter Template](./assets/starter-template.md)
- [Chart.js Best Practices: Validation Plan](./assets/validation-plan.md)
- [Chart.js Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
