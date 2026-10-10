# Gorilla Best Practices

Gorilla is a **library, not a framework** — gorilla/mux for routing, gorilla/handlers/gorilla/mux.MiddlewareFunc for middleware, gorilla/encoding/json for JSON, and gorilla/websocket for WebSocket. Practical Gorilla leans on **mux.NewRouter as a plain http.Handler, middleware via r.Use/MiddlewareFunc, and the context for request-scoped state**. The toolkit composes with net/http rather than replacing it — you write a...

## When to use

Use when writing, structuring, or reviewing Gorilla-based services.

## Core topics

- 1. Router
- 2. Middleware
- 3. Handlers & Responses
- 4. JSON Handling
- 5. WebSocket
- 6. Sessions

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Gorilla Best Practices: Basic Usage](./examples/basic-usage.md)
- [Gorilla Best Practices: 3. Handlers & Responses](./examples/reliability-and-edge-cases.md)
- [Gorilla Best Practices: 2. Middleware](./examples/setup-and-configuration.md)
- [Gorilla Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [Gorilla Best Practices: Decision Record](./assets/decision-record.md)
- [Gorilla Best Practices: Starter Template](./assets/starter-template.md)
- [Gorilla Best Practices: Validation Plan](./assets/validation-plan.md)
- [Gorilla Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
