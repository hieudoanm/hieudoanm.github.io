---
name: "arch-linux"
description: "Best practices for administering Arch Linux — pacman, the no-partial-upgrade rule, AUR and PKGBUILDs, kernel/initramfs/bootloader management, .pacnew config drift, and rollback. Use when installing, upgrading, or troubleshooting Arch or an Arch-based system."
tags:
  - "programming"
  - "development"
  - "linux"
  - "arch"
when_to_use: "Use when installing, upgrading, or troubleshooting Arch or an Arch-based system."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../debian/SKILL.md"
  - "../ubuntu/SKILL.md"
  - "../mint/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Arch Linux Best Practices

Arch is the distribution that refuses to make your life easy so that nothing gets in the way of the current upstream release. Its defining traits are **a single rolling release with no versions, a package manager that will not let you upgrade halfway, and a user-owned ecosystem in the AUR** — which makes it the ideal daily driver for a developer and a poor fit for anything you cannot personally fix. Practical Arch work leans on **pacman -Syu as an atomic habit, reading a PKGBUILD before you build it, and treating /etc drift as a queue you must work through**.

_Verified Sept 2026: rolling...

## When to use

Use when installing, upgrading, or troubleshooting Arch or an Arch-based system.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **pacman -Sy pkg**, the defining Arch error — it desynchronises the database from the system and manufactures a partial upgrade
- **makepkg as root**, executing untrusted build code with full privileges
- **Building an AUR package without updpkgs after a library bump**, then debugging a "random" segfault
- **Skimming the PKGBUILD**, which is the only review the AUR model offers you
- **Editing a .pacnew backlog until it is ignored**, leaving months of upstream config changes unapplied
- **IgnorePkg left in place "temporarily"**, quietly breaking the upgrade invariant forever
- **pacman -Sc or a manual cache wipe**, deleting every rollback point at once
- **Hand-editing a generated bootloader config**, which the next grub-mkconfig overwrites

## Focus areas

- 1. The Rolling Model
- 2. pacman
- 3. Upgrading Safely
- 4. AUR & PKGBUILDs
- 5. Kernel, Initramfs & Boot
- 6. Config Files & Drift
- 7. Maintenance & Rollback
- 8. Containers & CI
- 9. Security
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
