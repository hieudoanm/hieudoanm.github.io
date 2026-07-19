# Tornado Best Practices: Decision Record

Use this record when applying [Tornado Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building web services with Tornado — the asynchronous Python web framework / non-blocking server conventions. Use when writing, structuring, or reviewing Tornado — covers coroutines, handlers, async clients, ioloop, and deployment.

Tornado is a **non-blocking, async Python web framework and server** — tornado.web with async def get/post handlers, native coroutine support, and the IOLoop at the center. Practical Tornado leans on **async handler methods only (no blocking calls on the loop), @gen.coroutine-era discipline now via native async/await, non-blocking HTTP clients (AsyncHTTPClient) for downstream calls, and explicit ioloop lifecycle** — one blocking call freezes every request; the IOLoop is the heartbeat.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Handlers & Routing
- [ ] 2. Async Discipline
- [ ] 3. IOLoop & Lifecycle
- [ ] 4. Input/Output & Streaming
- [ ] 5. Static & WebSockets
- [ ] 6. Testing & Deployment
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
