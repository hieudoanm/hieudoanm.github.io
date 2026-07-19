# Debian Best Practices: 7. Security

## Scenario

A project is working on **7. security** for Debian Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Enable `unattended-upgrades`** (in `stable`/`stable-security`) and keep `stable` pinned out of automatic upgrades if you want security-only automation.
- **Ship an SSH config that disables password auth** before exposing a port. `PermitRootLogin prohibit-password`, `PasswordAuthentication no`, key-only.
- **`debsecan` against security.debian.org** finds packages removed from the archive for vulnerabilities — useful for a long-lived image you have not rebuilt in months.
- **Do not add a repository just to get a newer version of one package** without pinning and a plan to remove it. That is how a server ends up quietly running unaudited code.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **7. Security** section of [SKILL.md](../SKILL.md).
