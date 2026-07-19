# Google Charts Best Practices

Google Charts (the gviz/google.visualization library) renders **hosted SVG charts from a DataTable** — load the loader, build the table, pick a chart class, render with options. Practical Google Charts leans on **the loader google.charts.load("current", {packages:[...]}) + setOnLoadCallback, DataTable semantics (columns typed) over ad-hoc arrays, and explicit options per chart** — the data shape (DataTable) is the...

## When to use

Use when writing, structuring, or reviewing Google Charts.

## Core topics

- 1. Loading & Bootstrap
- 2. DataTable Semantics
- 3. Charts & Options
- 4. Events & Interaction
- 5. Responsive & Re-render
- 6. Performance & Load

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Google Charts Best Practices: Basic Usage](./examples/basic-usage.md)
- [Google Charts Best Practices: 6. Performance & Load](./examples/reliability-and-edge-cases.md)
- [Google Charts Best Practices: 2. DataTable Semantics](./examples/setup-and-configuration.md)
- [Google Charts Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Google Charts Best Practices: Decision Record](./assets/decision-record.md)
- [Google Charts Best Practices: Starter Template](./assets/starter-template.md)
- [Google Charts Best Practices: Validation Plan](./assets/validation-plan.md)
- [Google Charts Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
