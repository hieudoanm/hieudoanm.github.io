# Linux Mint Best Practices: Validation Plan

Use this plan to verify work guided by [Linux Mint Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **sudo apt upgrade,** which bypasses certification and is the most common way to break a Mint machine
- [ ] **Treating timeshift as a backup**, and discovering that during a disk failure
- [ ] **Running mintupgrade without snapshots,** or with held/third-party packages still installed
- [ ] **DKMS modules failing silently under secure boot** because the key is not enrolled
- [ ] **Mixing LMDE and Ubuntu-based advice,** which produces lockfile and repository confusion
- [ ] **Expecting kernel linux-headers to follow a kernel update** automatically; they do not
- [ ] **Installing a Flatpak for an app that needs host integration,** then debugging the sandbox instead of the app
- [ ] **Using the desktop image in CI,** paying gigabytes for a X server that never starts

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
