# Plotly.js Best Practices

Plotly.js is **an interactive, WebGL-era chart library** — config = traces + layout + config, rendered via Plotly.newPlot/react. Practical Plotly.js leans on **typed trace arrays per data series, layout structure (axes/layout/showlegend), Plotly.react for updates over shake-in-the-wind re-plotting, and the WebGL/scattergl fast path for large N** — the data-to-trace mapping and the update discipline are the craft.

## When to use

Use when writing, structuring, or reviewing Plotly.

## Core topics

- 1. Traces & Layout
- 2. Updating
- 3. Performance for Large Data
- 4. Config & Interactivity
- 5. Interaction & Events
- 6. Integration & Trust

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Plotly.js Best Practices: Basic Usage](./examples/basic-usage.md)
- [Plotly.js Best Practices: 3. Performance for Large Data](./examples/reliability-and-edge-cases.md)
- [Plotly.js Best Practices: 4. Config & Interactivity](./examples/setup-and-configuration.md)
- [Plotly.js Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Plotly.js Best Practices: Decision Record](./assets/decision-record.md)
- [Plotly.js Best Practices: Starter Template](./assets/starter-template.md)
- [Plotly.js Best Practices: Validation Plan](./assets/validation-plan.md)
- [Plotly.js Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
