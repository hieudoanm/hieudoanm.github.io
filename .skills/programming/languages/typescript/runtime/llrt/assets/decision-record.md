# LLRT Best Practices: Decision Record

Use this record when applying [LLRT Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building with LLRT (Low Latency Runtime) — the fast AWS Lambda JavaScript runtime conventions. Use when writing, structuring, or reviewing LLRT-based serverless — covers runtime install/pinning, compat surface, Cold starts, and AWS integration.

LLRT (**Low Latency Runtime**) is **an optimized-embedding runtime (QuickJS-based) for AWS Lambda JS functions — cold starts ~2–5x faster than Node** with a trimmed engine surface. Practical LLRT leans on **explicit runtime pinning (aws-lambda-js-rt extension / binary download), staying inside the supported JS surface (no Node-only globals), small bundles, and measuring cold-start under your own load** — LLRT's wins come from its env (embedding) — respect that: fewer deps, fewer Node-isms.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Runtime Setup
- [ ] 2. Surface & Compatibility
- [ ] 3. Cold Start & Bundle
- [ ] 4. Async & Events
- [ ] 5. Logging & Observability
- [ ] 6. CI & Testing
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
