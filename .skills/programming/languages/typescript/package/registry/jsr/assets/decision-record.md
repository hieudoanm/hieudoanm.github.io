# JSR Best Practices: Decision Record

Use this record when applying [JSR Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for publishing and consuming JavaScript packages on JSR (jsr.io) — the modern JS/TS registry conventions. Use when writing, structuring, or reviewing JSR packages — covers scope/name, deno assert/browser interop, publish flow, and CI.

JSR (jsr.io) is **a modern registry for TypeScript-first packages, designed to work with Deno, Node, and the browser** — publishing via jsr publish with deno.json/jsr.json metadata and a source-driven package (JSR is native to JSR-typed Deno; interop via npm: and jsr: specifiers). Practical JSR leans on **a clean scope/name, an explicit deno.json { exports, name, version }, publishing from CI with --allow-dirty gates, and compatibility tested across runtimes** — the package is source-first; the registry verifies metadata.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Package Metadata
- [ ] 2. Source-First Structure
- [ ] 3. Runtime Compatibility
- [ ] 4. Publishing & CI
- [ ] 5. Consuming JSR
- [ ] 6. Hygiene & Security
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
