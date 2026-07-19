# Deno Runtime Best Practices: Decision Record

Use this record when applying [Deno Runtime Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building applications that run on the Deno runtime (TypeScript). Use when structuring or reviewing Deno scripts, servers, or tools — covers permissions, module URLs and JSR, the standard library, Web APIs, testing, and tooling.

Deno is a secure-by-default TypeScript-first runtime: modules come from URLs/JSR, permissions are granted explicitly per-run, everything standard ships in the runtime and deno_std, and the toolchain (fmt, lint, test, doc, compile) is built in. Best practice here is embracing that model — sandboxed permissions as a feature, URL/JSR modules without node_modules, Web-standard APIs by default, and letting the built-in tools be the gates.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Secure by Default (Permissions)
- [ ] 2. Modules & Dependencies
- [ ] 3. Code Organization
- [ ] 4. Web APIs & I/O
- [ ] 5. TypeScript & Strict Mode
- [ ] 6. Testing
- [ ] 7. Tooling (In-the-Box)
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
