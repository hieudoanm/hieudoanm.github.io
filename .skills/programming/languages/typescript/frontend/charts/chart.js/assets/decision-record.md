# Chart.js Best Practices: Decision Record

Use this record when applying [Chart.js Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for data visualization with Chart.js — the canvas-based charting conventions for JS dashboards. Use when writing, structuring, or reviewing Chart.js — covers configuration, datasets, options, plugins, responsive behavior, and performance.

Chart.js renders **canvas-based charts in the browser** — new Chart(ctx, {...}) with datasets, scales, and options; responsive out of the box. Practical Chart.js leans on **a Chart-controller registry reuse pattern (Chart.getChart(element)), structured datasets with explicit colors/fill, option placement correct (global vs scales vs plugins), and destroy/update lifecycle discipline** — the canvas is the target; manage instance lifecycle or leak listeners.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Creating & Lifecycle
- [ ] 2. Datasets & Colors
- [ ] 3. Scales & Axes
- [ ] 4. Responsive & Layout
- [ ] 5. Plugins & Interaction
- [ ] 6. Performance
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
