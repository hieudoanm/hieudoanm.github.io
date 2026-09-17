# Workflow notes

Focused reference for **mint-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
