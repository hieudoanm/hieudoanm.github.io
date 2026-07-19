# Debian Best Practices: Workflow Checklist

A practical run sheet for applying [Debian Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. The Release Lifecycle: **stable is a moving target; codenames are frozen.** A new stable appears roughly every two years, _when the release team signs off_, not on a calendar. Bookworm (12) and Bullseye (11) are still supported alongside Trixie
- [ ] 1. The Release Lifecycle: **Three suites per release**: trixie (stable), trixie-updates, and trixie-security from security.debian.org. All three belong in your sources list
- [ ] 2. Packages: apt vs dpkg: **apt is the interface, apt-get and apt-cache are the stable scriptable ones.** Use apt interactively (it has progress bars) and apt-get in scripts and Dockerfiles
- [ ] 2. Packages: apt vs dpkg: **apt update before anything else.** It refreshes indexes only — it does not install upgrades. Pair it with apt upgrade for the two-step habit that survives flaky networks
- [ ] 3. Sources & Pinning: **One file per source in /etc/apt/sources.list.d/*.list or .sources** (deb822 format). Never hand-edit a single monolithic list in a provisioning script
- [ ] 3. Sources & Pinning: **Use https://**, and install ca-certificates first. http:// repos are a downgrade waiting to happen
- [ ] 4. System & Services: **systemd is the init.** systemctl enable --now unit for services, status for state, journalctl -u unit -f for logs. -f follows
- [ ] 4. System & Services: **systemctl restart is a stop-then-start, not a reload.** For long-running services, prefer reload when the daemon supports it, or try-restart when you only want a restart if it is running
- [ ] 5. Users & Permissions: **Debian installs no sudo by default** — you log in as root or use su -. For a server, add it deliberately: adduser deploy && adduser deploy sudo, then edit sudoers with visudo, never with a plain editor
- [ ] 5. Users & Permissions: **Prefer adduser over useradd.** Debian's adduser is interactive, sane about home directory layout, and gets groups right. useradd is the lower-level tool from passwd

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
