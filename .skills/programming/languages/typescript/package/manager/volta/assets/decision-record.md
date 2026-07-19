# Volta Best Practices: Decision Record

Use this record when applying [Volta Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for managing Node toolchains with Volta — the per-project Node/yarn/pnpm launcher conventions. Use when writing, structuring, or reviewing Volta setups — covers hooks, tool pinning, environments, and CI.

Volta is **a JS toolchain manager that pins Node, yarn/pnpm, and nvm-style runtime per-project — via volta "hooks" in package.json** — routing the right version from the toolchain section. Practical Volta leans on **volta pin node@20 yarn@4 in the project (committed), Volta installs env-consistency across shells, and CI reuse volta setup/volta run for an engine-exact build** — the package.json volta block IS the contract; the lockfile adds the rest.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Pinning the Toolchain
- [ ] 2. Setup & Environment
- [ ] 3. Per-Project Consistency
- [ ] 4. CI Integration
- [ ] 5. Compat & Troubleshooting
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
