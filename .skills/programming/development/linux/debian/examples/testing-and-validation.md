# Debian Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Debian Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Sources list has `stable`, `stable-updates`, and `stable-security` over `https://`
- [ ] Any third-party repo is pinned via `/etc/apt/preferences.d/`, with an owner
- [ ] `DEBIAN_FRONTEND=noninteractive` set and `tzdata`/`sshd`/`grub-pc` pre-seeded
- [ ] Non-root user with least-privilege `sudo`, managed with `visudo`
- [ ] Services run as dedicated system users, not root
- [ ] systemd overrides done with `systemctl edit`, not by editing `/lib/systemd/system`
- [ ] `unattended-upgrades` configured for security updates

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
