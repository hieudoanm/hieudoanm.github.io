# Arch Linux Best Practices: Decision Record

Use this record when applying [Arch Linux Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for administering Arch Linux — pacman, the no-partial-upgrade rule, AUR and PKGBUILDs, kernel/initramfs/bootloader management, .pacnew config drift, and rollback. Use when installing, upgrading, or troubleshooting Arch or an Arch-based system.

Arch is the distribution that refuses to make your life easy so that nothing gets in the way of the current upstream release. Its defining traits are **a single rolling release with no versions, a package manager that will not let you upgrade halfway, and a user-owned ecosystem in the AUR** — which makes it the ideal daily driver for a developer and a poor fit for anything you cannot personally fix. Practical Arch work leans on **pacman -Syu as an atomic habit, reading a PKGBUILD before you build it, and treating /etc drift as a queue you must work through**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. The Rolling Model
- [ ] 2. pacman
- [ ] 3. Upgrading Safely
- [ ] 4. AUR & PKGBUILDs
- [ ] 5. Kernel, Initramfs & Boot
- [ ] 6. Config Files & Drift
- [ ] 7. Maintenance & Rollback
- [ ] 8. Containers & CI

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
