# WinterJS Best Practices: Decision Record

Use this record when applying [WinterJS Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building with WinterJS — the WinterCG-compliant JavaScript runtime conventions. Use when writing, structuring, or reviewing WinterJS deployments — covers the runtime, WinterCG APIs, deployment (Cloudflare-style), and compatibility.

WinterJS (**Winter Runtime**, from wasmer/Sparkle) is **a WinterCG-compliant runtime for the modern web-beyond—a HTTP/Node-compatible, deploy-fast layer** — designed around the WinterCG interoperability spec (fetch-first, Request/Response, WebStreams, no Node-only process APIs). Practical WinterJS leans on **platform APIs over Node built-ins (WinterCG surface), declarative deployments (Cloudflare Workers-like), and strict third-party-bundle discipline** — code that is WinterCG-clean runs unmodified across Cloudflare Workerd, LLRT, and Node-with-adapters.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Runtime & Compatibility
- [ ] 2. The Fetch-First Model
- [ ] 3. Deployment & Config
- [ ] 4. State & Storage
- [ ] 5. Ecosystem & Adapters
- [ ] 6. Testing & Ops
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
