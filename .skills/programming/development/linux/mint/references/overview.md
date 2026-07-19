# Overview

Focused reference for **mint-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Linux Mint Best Practices

Linux Mint is an Ubuntu derivative with a **deliberately conservative curation policy**: packages are held back until the team certifies them, and the project's stated goal is that an update never breaks your machine. Its default Cinnamon desktop, `timeshift` snapshots, and first-class Flatpak support are the reason people choose it. Practical Mint work leans on **the Update Manager rather than raw `apt upgrade`, snapshots before anything risky, and `mintupgrade` only across major versions**.

_Current: Linux Mint 22.3 "Zena" (Jan 2026) — Ubuntu 24.04 base, kernel 6.14, supported until 2029. Mint 23 is expected late 2026; Linux Mint Debian Edition is the Debian-based variant._

---

## 1. Editions & Base

- **Three desktop editions ship**: Cinnamon (default), MATE (lighter, closer to classic GNOME 2), and XFCE. There are also community editions including GNOME. Pick at install time — switching afterwards is a project, not a preference.
- **All standard editions are Ubuntu-based**, so every `apt` idiom from ubuntu.md applies, including netplan on Server and the snapd discussion. Read that file rather than assuming Mint is simpler.
- **Linux Mint Debian Edition (LMDE) is the exception** — it tracks Debian stable rather than an Ubuntu LTS. It has a different upgrade cadence and a smaller package pool. Do not mix advice between LMDE and the Ubuntu-based editions.
- **The Mint repository sits alongside Ubuntu's** in your sources list. `apt` handles both; you should never have to think about which one a package came from.
- **This is a workstation-oriented distribution.** For a headless server, use debian.md or ubuntu.md — you gain nothing here and lose the deliberate update gating that is Mint's whole point.

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
