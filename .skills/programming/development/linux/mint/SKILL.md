---
name: "mint-linux"
description: "Best practices for Linux Mint — Cinnamon desktops, the conservative Update Manager, timeshift snapshots, driver management, Flatpak, and release-to-release upgrades. Use when setting up or maintaining a Mint workstation."
tags:
  - "programming"
  - "development"
  - "linux"
  - "mint"
when_to_use: "Use when setting up or maintaining a Mint workstation."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../ubuntu/SKILL.md"
  - "../arch/SKILL.md"
  - "../debian/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# Linux Mint Best Practices

Linux Mint is an Ubuntu derivative with a **deliberately conservative curation policy**: packages are held back until the team certifies them, and the project's stated goal is that an update never breaks your machine. Its default Cinnamon desktop, `timeshift` snapshots, and first-class Flatpak support are the reason people choose it. Practical Mint work leans on **the Update Manager rather than raw `apt upgrade`, snapshots before anything risky, and `mintupgrade` only across major versions**.

_Current: Linux Mint 22.3 "Zena" (Jan 2026) — Ubuntu 24.04 base, kernel 6.14, supported until 2029. Mint 23 is expected late 2026; Linux Mint Debian Edition is the Debian-based variant._

---

## 1. Editions & Base

- **Three desktop editions ship**: Cinnamon (default), MATE (lighter, closer to classic GNOME 2), and XFCE. There are also community editions including GNOME. Pick at install time — switching afterwards is a project, not a preference.
- **All standard editions are Ubuntu-based**, so every `apt` idiom from [ubuntu.md](../ubuntu/SKILL.md) applies, including netplan on Server and the snapd discussion. Read that file rather than assuming Mint is simpler.
- **Linux Mint Debian Edition (LMDE) is the exception** — it tracks Debian stable rather than an Ubuntu LTS. It has a different upgrade cadence and a smaller package pool. Do not mix advice between LMDE and the Ubuntu-based editions.
- **The Mint repository sits alongside Ubuntu's** in your sources list. `apt` handles both; you should never have to think about which one a package came from.
- **This is a workstation-oriented distribution.** For a headless server, use [debian.md](../debian/SKILL.md) or [ubuntu.md](../ubuntu/SKILL.md) — you gain nothing here and lose the deliberate update gating that is Mint's whole point.

---

## 2. Updates: Use the Update Manager

- **Do not run `sudo apt upgrade` on Mint.** This is the single most important rule. Raw `apt upgrade` bypasses the certification queue and can install a package version the team has deliberately held back as broken.
- **Use the Update Manager for everything.** It shows which levels a package is available at, which is the mechanism by which Mint holds back risky updates.
- **The three levels**: _Safe_ (tested configurations only), _Standard_ (most updates, the sensible default), _Risky_ (unusual configurations and hardware — only if you know why you need it).
- **Apply the OS and _Security_ updates in the same session** where practical, so a reboot lands you on a consistent state rather than a half-upgraded one.
- **After updates, restart when prompted** — and read what the prompt says. Mint has historically held back updates specifically because a restart was required to avoid a known-broken combination.
- **Set up a refresh policy rather than checking manually.** `mintupdate` on a schedule keeps the "hold back" model intact while removing the weekly chore.

```bash
# Safe, repeatable refresh outside the GUI
sudo apt update
apt list --upgradable        # read this before deciding
sudo mintupgrade check       # is a new release available? (does not upgrade)
```

---

## 3. Upgrading Across Releases

- **`mintupgrade` is the only supported path between Mint versions.** It is purpose-built to walk a machine forward, handling the base change, driver packages, and the known-problem list.
- **It upgrades one major version at a time.** Skipping a release means installing the intermediate ISO and upgrading again.
- **Back up first, with timeshift** (see §4). `mintupgrade` asks you to deauthorize held packages, clean `/etc`, and drop third-party repositories; each of those steps can strand a machine.
- **Purge third-party repos before upgrading.** An old PPA or a stale `sources.list.d` entry is the most common cause of a failed Mint upgrade.
- **Check the "New features" page for the target release** before you commit. Mint documents what changes and which upstream quirks are inherited.

---

## 4. Timeshift & Backup

- **Timeshift uses BTRFS or RSYNC snapshots and is the pre-upgrade safety net** Mint is designed around. On BTRFS it is near-instant; on RSYNC it copies, so budget disk and time.
- **It is not a backup.** A snapshot lives on the same machine as the failure. It protects against a bad update, not a dead disk.
- **Take a snapshot before any major operation** — a release upgrade, a kernel change, a driver install, or a large `apt` transaction.
- **Set a retention policy.** Default schedules keep snapshots inside the same filesystem and will eventually fill it. Explicit limits plus a pre-upgrade snapshot is the combination that works.
- **Have a real backup for anything you cannot recreate**: use rsync, `borg`, or a snapshot tool for your home directory, and test a restore once. Timeshift excludes `/home` by default precisely because it is not a backup of your data.

---

## 5. Drivers & Hardware

- **Driver Manager handles proprietary graphics and wireless drivers**, downloaded as `.deb` packages from Ubuntu's pool rather than compiled on the machine. This is why a proprietary driver works on Mint where a manual build would be painful.
- **Kernel headers must match the running kernel** before DKMS can build anything. After a kernel update, install the matching `linux-headers-$(uname -r)` before attempting any DKMS module.
- **If secure boot is enabled, a DKMS module will not load** until its key is enrolled in the firmware. The symptom is a module that builds and then silently fails to load — check `dmesg`, not the build log.
- **Prefer the kernel you are shipped** unless you have a concrete reason to switch. Mint's kernel choice is a tested one; a mainline or rt kernel is a debugging project.

---

## 6. Flatpak & Desktop Apps

- **Flatpak is the recommended route for desktop applications on Mint**, and Mint integrates it directly. Browser, Spotify, Discord, and most GUI apps are available as Flatpaks and stay current without touching your system.
- **Add Flathub if it is not already present:**

```bash
flatpak remote-add --if-not-exists flathub \
  https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak install flathub org.mozilla.firefox
flatpak update
```

- **Flatpak permissions are a real boundary.** `flatpak override --user --talk-name=org.freedesktop.Notifications <app>` to grant an exception, or use Flatseal when a permission needs explaining to a human.
- **Some apps ship both deb and Flatpak.** Prefer the Flatpak for update cadence; prefer the deb when the app needs host integration (file dialogs, browser plugins, proprietary codecs) that Flatpak sandboxes away.
- **Snap and Flatpak coexist.** This is normal and is not a conflict — but it is two update systems, and only one of them is certification-gated. Know which apps are in which before troubleshooting a version regression.

---

## 7. Desktop Customisation Notes

- **Cinnamon is configured through its own settings applets**, not a single settings file. When scripting desktop changes, prefer dconf/gsettings (`gsettings set org.cinnamon.desktop...`) over editing applets' state files.
- **Theme and icon changes need the right tool.** `update-alternatives` selects the system cursor and editor; Flatseal handles Flatpak theme access. Changing `/usr/share/icons` directly is undone by updates.
- **The Driver Manager, Update Manager, and Backup Tool are the three applets worth learning** before reaching for a terminal.
- **Enable Timeshift's scheduled snapshots on first boot** if this machine matters. Retrofitting a snapshot scheme after an incident is too late.

---

## 8. Containers

- **Mint publishes official images** as `linuxmintd/mint<N>-amd64` (for example `linuxmintd/mint22.3-amd64`), including a `core` variant with no desktop.
- **Use the `core` image for CI.** The full desktop image is several gigabytes of X11 that a build container will never use.
- **No `apt upgrade` in a Dockerfile** — and here the reason is stronger than usual, since the whole point of Mint's policy is that upgrading changes what you get.
- **Prefer a `debian` or `ubuntu` base for containers** unless you specifically need Mint's package set. See [ubuntu.md](../ubuntu/SKILL.md).

---

## 9. Common Pitfalls

- **`sudo apt upgrade`,** which bypasses certification and is the most common way to break a Mint machine.
- **Treating timeshift as a backup**, and discovering that during a disk failure.
- **Running `mintupgrade` without snapshots,** or with held/third-party packages still installed.
- **DKMS modules failing silently under secure boot** because the key is not enrolled.
- **Mixing LMDE and Ubuntu-based advice,** which produces lockfile and repository confusion.
- **Expecting kernel `linux-headers` to follow a kernel update** automatically; they do not.
- **Installing a Flatpak for an app that needs host integration,** then debugging the sandbox instead of the app.
- **Using the desktop image in CI,** paying gigabytes for a X server that never starts.

---

## 10. General Rules of Thumb

- Update through the Update Manager, never raw `apt upgrade`; keep the certification gate intact.
- Snapshot with timeshift before any large change, and back up your data somewhere else.
- Upgrade across releases only with `mintupgrade`, one major version at a time.
- Flatpak for desktop apps, apt for system integration, and know which is which.
- Take drivers from Driver Manager and match `linux-headers` to the running kernel.
- Server or container work belongs on Debian or Ubuntu, not here.

---

## Quick-Start Checklist

- [ ] Edition (Cinnamon / MATE / XFCE / LMDE) chosen deliberately at install
- [ ] Update Manager used for all updates; `apt upgrade` reserved for reading with `apt list --upgradable`
- [ ] Refresh policy configured so the certification queue is respected
- [ ] Timeshift scheduled snapshots enabled, with a retention limit and free space confirmed
- [ ] A real, tested backup exists for anything timeshift does not cover (`/home`)
- [ ] Third-party repositories purged before any release upgrade
- [ ] `mintupgrade check` run, then `mintupgrade` one major version at a time
- [ ] `linux-headers-$(uname -r)` installed before any DKMS module is built
- [ ] Secure boot key enrolled if a DKMS module is required at boot
- [ ] Flathub added; Flatpak permissions reviewed for anything needing host access
- [ ] Snap vs Flatpak vs deb inventoried per application
- [ ] Containers use `linuxmintd/mint<N>-amd64-core`, or a Debian/Ubuntu base
