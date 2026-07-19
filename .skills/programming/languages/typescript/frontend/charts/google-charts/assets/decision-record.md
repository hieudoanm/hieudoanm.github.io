# Google Charts Best Practices: Decision Record

Use this record when applying [Google Charts Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating Google Charts (gviz) — the hosted-chart conventions for JS dashboards. Use when writing, structuring, or reviewing Google Charts — covers loading, DataTable vs Array, options, events, and rendering/performance.

Google Charts (the gviz/google.visualization library) renders **hosted SVG charts from a DataTable** — load the loader, build the table, pick a chart class, render with options. Practical Google Charts leans on **the loader google.charts.load("current", {packages:[...]}) + setOnLoadCallback, DataTable semantics (columns typed) over ad-hoc arrays, and explicit options per chart** — the data shape (DataTable) is the contract; options are the flavor.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Loading & Bootstrap
- [ ] 2. DataTable Semantics
- [ ] 3. Charts & Options
- [ ] 4. Events & Interaction
- [ ] 5. Responsive & Re-render
- [ ] 6. Performance & Load
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
