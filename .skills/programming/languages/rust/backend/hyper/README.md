# Hyper Best Practices

hyper is the underlying HTTP library for much of the Rust ecosystem — it gives you the **HTTP protocol (HTTP/2, client + server) while you own the composition**. Practical hyper leans on **hyper::Server with a Service implementing call(req)**, **typed requests/bodies (hyper::Request/Response<Body>)**, and **explicit routing/error mapping because hyper provides none of it**. It's the right choice when you need control or...

## When to use

Use when writing, structuring, or reviewing hyper-based services.

## Core topics

- 1. Server Basics
- 2. The Service Trait
- 3. Requests, Bodies & Extractors
- 4. Routing (Hand-Rolled)
- 5. Errors & Middleware
- 6. Client

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Hyper Best Practices: Basic Usage](./examples/basic-usage.md)
- [Hyper Best Practices: 5. Errors & Middleware](./examples/reliability-and-edge-cases.md)
- [Hyper Best Practices: 1. Server Basics](./examples/setup-and-configuration.md)
- [Hyper Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [Hyper Best Practices: Decision Record](./assets/decision-record.md)
- [Hyper Best Practices: Starter Template](./assets/starter-template.md)
- [Hyper Best Practices: Validation Plan](./assets/validation-plan.md)
- [Hyper Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
