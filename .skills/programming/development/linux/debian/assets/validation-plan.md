# Debian Best Practices: Validation Plan

Use this plan to verify work guided by [Debian Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Enable unattended-upgrades** (in stable/stable-security) and keep stable pinned out of automatic upgrades if you want security-only automation
- [ ] **Ship an SSH config that disables password auth** before exposing a port. PermitRootLogin prohibit-password, PasswordAuthentication no, key-only
- [ ] **debsecan against security.debian.org** finds packages removed from the archive for vulnerabilities — useful for a long-lived image you have not rebuilt in months
- [ ] **Do not add a repository just to get a newer version of one package** without pinning and a plan to remove it. That is how a server ends up quietly running unaudited code
- [ ] **No proprietary binaries by default.** If you need them, the licence and the update story are yours to own
- [ ] **apt update without apt upgrade**, leaving people believing packages are current
- [ ] **pip install as root on a modern release**, blocked by PEP 668 — use a venv
- [ ] **Editing files under /usr or /lib/systemd/system**, both overwritten on upgrade
- [ ] **Unpinned third-party repositories**, which silently drag half a dependency tree forward
- [ ] **Running apt upgrade in a Dockerfile**, making the image non-reproducible

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
