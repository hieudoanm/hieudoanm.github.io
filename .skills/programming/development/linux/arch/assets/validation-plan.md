# Arch Linux Best Practices: Validation Plan

Use this plan to verify work guided by [Arch Linux Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **No unattended-upgrades equivalent exists.** Automatic major upgrades are structurally unsafe on a rolling distro. You own the upgrade cadence, so schedule it
- [ ] **sudo is not installed by default** — you get root via su -. On a desktop, install it deliberately and keep the wheel rule (%wheel ALL=(ALL:ALL) ALL) in sudoers, edited with visudo
- [ ] **Give services their own system users.** Arch does not create them for you the way a server distro might, and running a daemon as root is entirely possible if you let it
- [ ] **pacman -Fy + pacman -F to trace a file** when auditing — after updatedb from mlocate
- [ ] **pacman -Qkk after a suspected compromise**, and diff the result against a known-good manifest
- [ ] **Treat an AUR package as unreviewed third-party code** even when it is one you have installed for a year. Re-read the PKGBUILD when the build fails — that is often when upstream changed something significant
- [ ] **Do not expose a rolling-release box to the internet on its own.** Arch assumes a competent local administrator; an unattended one is an accumulating liability
- [ ] **pacman -Sy pkg**, the defining Arch error — it desynchronises the database from the system and manufactures a partial upgrade
- [ ] **makepkg as root**, executing untrusted build code with full privileges
- [ ] **Building an AUR package without updpkgs after a library bump**, then debugging a "random" segfault

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
