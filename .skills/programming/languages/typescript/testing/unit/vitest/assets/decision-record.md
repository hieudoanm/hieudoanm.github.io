# Vitest Best Practices: Decision Record

Use this record when applying [Vitest Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for unit testing with Vitest — the Vite-native test runner conventions for the modern JS/TS ecosystem. Use when writing, structuring, or reviewing Vitest suites — covers config, matchers, mocking, coverage, watch mode, and CI.

Vitest is the **Vite-native test runner** — near-zero-config for Vite projects, ESM-first, fast watch mode, Jest-compatible API combined with Vite's HMR and aliases. Practical Vitest leans on **expect matchers + vi mocks (Jest-style), config that leans on Vite resolve.alias, and test.environment matched to the target (node vs jsdom/happy-dom)** — with the same behavioral discipline: describe/it sentences, boundary mocking, no sleep-based waits. Browser tests (vitest browser mode) fill the E2E gap where DOM behavior matters.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Config
- [ ] 2. Structure & Matchers
- [ ] 3. Mocking
- [ ] 4. Watch & DX
- [ ] 5. DOM & Browser Mode
- [ ] 6. CI & Repeatability
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
