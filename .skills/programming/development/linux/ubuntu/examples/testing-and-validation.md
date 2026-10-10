# Ubuntu Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Ubuntu Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Deployed an LTS release, not an interim one
- [ ] SSH hardened (key-only, root restricted) before the port is exposed
- [ ] `ufw default deny incoming`, `ufw allow OpenSSH`, then `ufw enable`
- [ ] netplan config in `/etc/netplan/`, validated with `netplan generate`, applied with `netplan try`
- [ ] DNS configured in netplan, not written into `/etc/resolv.conf`
- [ ] Hostname set in `/etc/hostname` and `/etc/hosts`
- [ ] `unattended-upgrades` scoped to `security` and `*-updates` only

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
