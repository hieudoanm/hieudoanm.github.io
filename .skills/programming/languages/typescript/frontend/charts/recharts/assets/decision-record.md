# Recharts Best Practices: Decision Record

Use this record when applying [Recharts Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for data visualization with Recharts — the React charting conventions for composable dashboards. Use when writing, structuring, or reviewing Recharts — covers components, data shape, tooltips, responsiveness, animation, and performance.

Recharts is the **composable React charting library** — SVG primitives (LineChart + Line, BarChart + Bar, etc.) driven by a **data array with named keys and reusable ResponsiveContainer**. Practical Recharts leans on **a consistent data shape across charts (default x[key]/value[key] coordinates), ResponsiveContainer for sizing, minimal Tooltip/Legend/CartesianGrid composition, and memoized chart components** — the chart is a tree of props; data transformation belongs outside it.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Data Shape
- [ ] 2. Composition
- [ ] 3. Tooltip & Accessibility
- [ ] 4. Responsiveness
- [ ] 5. Animation & Performance
- [ ] 6. They-Lifecycle & Types
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
