# Linux Mint Best Practices: Workflow Checklist

A practical run sheet for applying [Linux Mint Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Base: **Three desktop editions ship**: Cinnamon (default), MATE (lighter, closer to classic GNOME 2), and XFCE. There are also community editions including GNOME. Pick at install time — switching afterwards is a project, not a preference
- [ ] 1. Editions & Base: **All standard editions are Ubuntu-based**, so every apt idiom from ubuntu.md applies, including netplan on Server and the snapd discussion. Read that file rather than assuming Mint is simpler
- [ ] 2. Updates: Use the Update Manager: **Do not run sudo apt upgrade on Mint.** This is the single most important rule. Raw apt upgrade bypasses the certification queue and can install a package version the team has deliberately held back as broken
- [ ] 2. Updates: Use the Update Manager: **Use the Update Manager for everything.** It shows which levels a package is available at, which is the mechanism by which Mint holds back risky updates
- [ ] 3. Upgrading Across Releases: **mintupgrade is the only supported path between Mint versions.** It is purpose-built to walk a machine forward, handling the base change, driver packages, and the known-problem list
- [ ] 3. Upgrading Across Releases: **It upgrades one major version at a time.** Skipping a release means installing the intermediate ISO and upgrading again
- [ ] 4. Timeshift & Backup: **Timeshift uses BTRFS or RSYNC snapshots and is the pre-upgrade safety net** Mint is designed around. On BTRFS it is near-instant; on RSYNC it copies, so budget disk and time
- [ ] 4. Timeshift & Backup: **It is not a backup.** A snapshot lives on the same machine as the failure. It protects against a bad update, not a dead disk
- [ ] 5. Drivers & Hardware: **Driver Manager handles proprietary graphics and wireless drivers**, downloaded as .deb packages from Ubuntu's pool rather than compiled on the machine. This is why a proprietary driver works on Mint where a manual build would be painful
- [ ] 5. Drivers & Hardware: **Kernel headers must match the running kernel** before DKMS can build anything. After a kernel update, install the matching linux-headers-$(uname -r) before attempting any DKMS module

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
