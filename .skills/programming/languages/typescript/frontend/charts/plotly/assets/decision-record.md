# Plotly.js Best Practices: Decision Record

Use this record when applying [Plotly.js Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for creating interactive scientific charts with Plotly.js — the trace-layout WebGL/SVG charting conventions for JS. Use when writing, structuring, or reviewing Plotly — covers traces, layout, updates, and performance.

Plotly.js is **an interactive, WebGL-era chart library** — config = traces + layout + config, rendered via Plotly.newPlot/react. Practical Plotly.js leans on **typed trace arrays per data series, layout structure (axes/layout/showlegend), Plotly.react for updates over shake-in-the-wind re-plotting, and the WebGL/scattergl fast path for large N** — the data-to-trace mapping and the update discipline are the craft.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Traces & Layout
- [ ] 2. Updating
- [ ] 3. Performance for Large Data
- [ ] 4. Config & Interactivity
- [ ] 5. Interaction & Events
- [ ] 6. Integration & Trust
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
