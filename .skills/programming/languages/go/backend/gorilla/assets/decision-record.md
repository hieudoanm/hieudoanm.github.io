# Gorilla Best Practices: Decision Record

Use this record when applying [Gorilla Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using Gorilla Toolkit in Go — the classic library conventions for HTTP routing, middleware, JSON handling, and WebSocket sessions. Use when writing, structuring, or reviewing Gorilla-based services — covers mux, middleware, JSON handling, WebSocket, sessions, testing, and deployment.

Gorilla is a **library, not a framework** — gorilla/mux for routing, gorilla/handlers/gorilla/mux.MiddlewareFunc for middleware, gorilla/encoding/json for JSON, and gorilla/websocket for WebSocket. Practical Gorilla leans on **mux.NewRouter as a plain http.Handler, middleware via r.Use/MiddlewareFunc, and the context for request-scoped state**. The toolkit composes with net/http rather than replacing it — you write a standard handler, the framework helps where the stdlib is verbose.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Router
- [ ] 2. Middleware
- [ ] 3. Handlers & Responses
- [ ] 4. JSON Handling
- [ ] 5. WebSocket
- [ ] 6. Sessions
- [ ] 7. Testing
- [ ] General Rules of Thumb

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
