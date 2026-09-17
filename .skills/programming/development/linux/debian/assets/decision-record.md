# Debian Best Practices: Decision Record

Use this record when applying [Debian Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for administering Debian servers and desktops — apt and dpkg, pinning, releases lifecycle, minimal containers, systemd, and security. Use when provisioning or troubleshooting Debian.

Debian is the upstream community distribution that Ubuntu, Mint, and most others derive from. Its defining traits are **a frozen stable release, a deliberately conservative policy, and freedom from vendor lock-in** — which makes it the default choice for servers where predictability beats novelty. Practical Debian work leans on **apt for daily use and dpkg for the underlying truth, pinning when you must hold a version, and -slim images for containers**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. The Release Lifecycle
- [ ] 2. Packages: apt vs dpkg
- [ ] 3. Sources & Pinning
- [ ] 4. System & Services
- [ ] 5. Users & Permissions
- [ ] 6. Containers & CI
- [ ] 7. Security
- [ ] 8. Common Pitfalls

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
