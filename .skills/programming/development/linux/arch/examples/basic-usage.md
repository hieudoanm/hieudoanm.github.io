# Arch Linux Best Practices: Basic Usage

Best practices for administering Arch Linux — pacman, the no-partial-upgrade rule, AUR and PKGBUILDs, kernel/initramfs/bootloader management, .pacnew config drift, and rollback. Use when installing, upgrading, or troubleshooting Arch or an Arch-based system.

## Scenario

Use this example as a starting point when applying **arch-linux** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. pacman** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
pacman -Qi linux              # metadata: version, repo, licence, size
pacman -Qo /usr/bin/bash      # which package owns this file
pacman -Ql systemd | wc -l    # what did this package install
pacman -Qkk                  # verify checksums of every installed file
pacman -Ss ripgrep           # search repos (NOT the AUR)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
