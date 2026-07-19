# Bun Runtime Best Practices: Decision Record

Use this record when applying [Bun Runtime Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building applications that run on the Bun runtime (TypeScript/JavaScript). Use when structuring or reviewing Bun servers, CLIs, scripts, or tests — covers Bun.serve, file I/O, shell scripting, bun:test, the package manager, and tooling.

Bun is an all-in-one JavaScript/TypeScript runtime, bundler, transpiler, test runner, and package manager. It executes .ts/.tsx natively, implements web-standard APIs (fetch, WebSocket, Request/Response, Blob), and ships a fast filesystem, database (bun:sqlite), and shell-command layer. Best practice here is to lean into Bun's built-ins — Bun.serve/Bun.file/Bun.$/bun:test — instead of bolting on the node-style toolchain Bun replaces.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Runtime Foundations
- [ ] 2. Serving HTTP (Bun.serve)
- [ ] 3. File I/O & Blobs
- [ ] 4. Shell & Scripting (Bun.$, bunx)
- [ ] 5. Testing (bun:test)
- [ ] 6. The Package Manager
- [ ] 7. Tooling & Distribution
- [ ] 8. General Rules of Thumb

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
