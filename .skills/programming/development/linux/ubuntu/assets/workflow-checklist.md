# Ubuntu Best Practices: Workflow Checklist

A practical run sheet for applying [Ubuntu Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Release Model: **Two release channels**: LTS every two years in April (5 years standard, 10–12 with Ubuntu Pro), and interim releases in April/October for 9 months. Only deploy LTS to production
- [ ] 1. Release Model: **LTS → LTS upgrades go through do-release-upgrade**, provided by update-manager-core. It is deliberately conservative and interactive, and it wants a clean machine first
- [ ] 2. Packages & Components: **Four components**: main, restricted, universe, multiverse. main is community-built free software, universe is the big community archive, restricted is vendor drivers/firmware, multiverse is packages with licences requiring extra agreement
- [ ] 2. Packages & Components: **universe is the pragmatic default for servers.** Refusing it removes a large fraction of available tooling for no security benefit
- [ ] 3. PPAs & Third-Party Sources: **add-apt-repository ppa:owner/name is the sanctioned path** — install software-properties-common first, then add, apt update, install
- [ ] 3. PPAs & Third-Party Sources: **Adding a PPA grants that maintainer root over your package graph** for the lifetime of the source. Judge it like any other root-level dependency
- [ ] 4. Networking: netplan: **netplan owns network configuration** on Ubuntu Server (18.04+). Files live in /etc/netplan/*.yaml; changes are applied with netplan apply
- [ ] 4. Networking: netplan: **Always netplan try over ssh.** It applies the config and reverts automatically if you do not confirm within the timeout — the one command that makes remote netplan edits survivable
- [ ] 5. Snaps: **snap is a second package system** with automatic background updates, independent versioning, and confinement. It is installed by default, including on server images
- [ ] 5. Snaps: **The decision is yours, not snapd's.** A snap that auto-updates outside a change window is exactly what some regulated environments cannot accept, and the escape route is snap set system refresh.hold=true plus a controlled refresh schedule

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
