# Warp Best Practices

Warp builds servers from **composable Filters** — every route/fact (path, method, query, body, header, state) is a Filter combined with and/or/map/and_then. Practical warp leans on **small named filters (path("users").and(path::param::<u64>().or(...))), filters declared once and reused, warp::Filter-based extractors returning typed tuples**, and **Rejection-based error handling with warp::reject/recover**. The filter...

## When to use

Use when writing, structuring, or reviewing warp.

## Core topics

- 1. Filter Composition
- 2. Routes & Handlers
- 3. State & Dependencies
- 4. Errors & Rejections
- 5. Middleware & Logging
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Warp Best Practices: Basic Usage](./examples/basic-usage.md)
- [Warp Best Practices: 4. Errors & Rejections](./examples/reliability-and-edge-cases.md)
- [Warp Best Practices: 2. Routes & Handlers](./examples/setup-and-configuration.md)
- [Warp Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Warp Best Practices: Decision Record](./assets/decision-record.md)
- [Warp Best Practices: Starter Template](./assets/starter-template.md)
- [Warp Best Practices: Validation Plan](./assets/validation-plan.md)
- [Warp Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
