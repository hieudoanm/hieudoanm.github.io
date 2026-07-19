# TanStack Charts Best Practices: Decision Record

Use this record when applying [TanStack Charts Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building charts with TanStack Charts (formerly TanCharts) — the headless charting conventions for JS/React. Use when writing, structuring, or reviewing TanStack Charts — covers data/options model, axes, series, themes, performance, and updates.

TanStack Charts is the **headless charting library from the TanStack family** — you bring the rendering (react-table-style control: charts as composable primitives, canvas/SVG choice), powered by a **typed data + series + axes model and declarative options**. Practical TanStack Charts leans on **structuring data per axis semantics, declaring series with the options model, axes configuration explicit, and updating via the library's chart.updateOptions rather than recreation** — headless means you own rendering/hooks; the model stays the single source of truth.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. The Data Model
- [ ] 2. Chart & Options
- [ ] 3. Axes & Layout
- [ ] 4. Themes & Styling
- [ ] 5. Updates & Lifecycle
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
