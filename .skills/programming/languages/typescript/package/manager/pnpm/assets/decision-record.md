# pnpm Best Practices: Decision Record

Use this record when applying [pnpm Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for the pnpm package manager — strict, disk-efficient, and deterministic dependency conventions for JavaScript. Use when writing, structuring, or reviewing pnpm — covers install, store, workspaces, overrides, and CI.

pnpm is **a strict, disk-efficient package manager** — content-addressed global store symlinked into projects, with **strict node_modules isolation** (no phantom deps). Practical pnpm leans on **a committed lockfile (pnpm-lock.yaml) with frozenLockfile in CI, a shared global store (--store-dir) for disk savings, workspaces for monorepos, and deliberate overrides/peer handling** — isolation is the safety feature: packages can't import what they didn't declare.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Install & Lockfile
- [ ] 2. Store & Disk
- [ ] 3. Strictness & Phantom Deps
- [ ] 4. Workspaces
- [ ] 5. Overrides & Struggles
- [ ] 6. CI & Security
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
