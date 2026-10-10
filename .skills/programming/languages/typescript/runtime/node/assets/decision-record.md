# Node.js Runtime Best Practices: Decision Record

Use this record when applying [Node.js Runtime Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building applications that run on the Node.js runtime (TypeScript/JavaScript). Use when structuring or reviewing Node.js server, CLI, or library code — covers ESM, the event loop, streams, processes and signals, fs, testing, and tooling.

Node.js is a single-threaded, event-loop-based JavaScript runtime with a rich set of standard modules. The modern runtime has converged on ESM, node: (and node:test) built-ins, first-class fetch, and smooth TypeScript — so "best practice" is about writing non-blocking I/O, managing the process lifecycle explicitly, and using the well-trodden tools (node --watch, --env-file, node:test) instead of re-inventing them.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Module System (ESM by Default)
- [ ] 2. The Event Loop & Non-Blocking I/O
- [ ] 3. Streams & Large Data
- [ ] 4. Process Lifecycle, Signals & Exit Codes
- [ ] 5. Files, Paths & Environment
- [ ] 6. HTTP & Networking
- [ ] 7. Errors & Logging
- [ ] 8. Testing

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
