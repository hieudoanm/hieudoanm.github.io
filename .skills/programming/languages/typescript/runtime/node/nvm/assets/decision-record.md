# nvm: Decision Record

Use this record when applying [nvm](../SKILL.md) to a concrete project decision.

## Context

Best practices for managing Node.js versions with nvm — .nvmrc pinning, LTS policy, global package isolation, CI setup, and the systemd/production caveat. Use when pinning Node versions or fixing "wrong version" failures.

nvm is a **shell function library** that installs each Node.js version into its own directory under ~/.nvm/versions/node/ and manipulates PATH to switch between them. That per-version isolation is the reason it works: two projects needing incompatible Node versions coexist on one machine without conflict. Practical nvm work is about **committing the version, defaulting to LTS, and knowing the two places it does not work** — production daemons and Windows shells.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Install
- [ ] 2. Pinning Per Project
- [ ] 3. LTS Policy
- [ ] 4. Daily Commands
- [ ] 5. Global Packages
- [ ] 6. CI
- [ ] 7. Production & Daemons
- [ ] 8. Alternatives

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
