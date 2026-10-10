# Yarn Best Practices: Decision Record

Use this record when applying [Yarn Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for the Yarn package manager (Yarn classic and modern Yarn 4+ PnP) — dependency conventions for JavaScript. Use when writing, structuring, or reviewing Yarn projects — covers install modes, lockfiles, PnP/silent, workspaces, and CI.

Yarn is **a package manager focused on reliability and speed** — available as Yarn Classic (v1, node_modules) and Yarn Modern (v4+, with **Plug'n'Play / Zero-Install**). Practical Yarn leans on **sticking to ONE major version per repo (mixing v1/v4 configs breaks), committing the lockfile (yarn.lock), choosing node_modules vs PnP deliberately, and yarn classic-only flags gated in CI** — Pin the toolchain: corepack + a committed .yarnrc.yml.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Choosing Yarn & Version
- [ ] 2. Lockfiles & Install
- [ ] 3. PnP vs node_modules
- [ ] 4. Workspaces & Monorepos
- [ ] 5. Scripts & Lifecycle
- [ ] 6. Security & CI
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
