# Overview

Focused reference for **ubuntu-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Ubuntu Best Practices

Ubuntu is Debian stable with a fixed two-year release cadence, a wider set of prebuilt components, and Canonical's cloud and desktop integration layered on top. Its defining trade is **a predictable schedule and commercial support in exchange for newer kernels and more opinionated defaults** — which makes it the pragmatic default for cloud, containers, and teams that want a vendor. Practical Ubuntu work leans on **`netplan` for networking, PPAs as the sanctioned extension mechanism, and `unattended-upgrades` for security patching**.

_Current LTS: Ubuntu 26.04 "Resolute Raccoon" (April 2026) — kernel 7.0, Rust-based core utilities, free support to April 2031, to 2041 with Ubuntu Pro._

---

## 1. Release Model

- **Two release channels**: LTS every two years in April (5 years standard, 10–12 with Ubuntu Pro), and interim releases in April/October for 9 months. Only deploy LTS to production.
- **LTS → LTS upgrades go through `do-release-upgrade`**, provided by `update-manager-core`. It is deliberately conservative and interactive, and it wants a clean machine first.
- **An LTS ships one kernel and gains newer ones via HWE.** If a fresh CPU is unsupported, it is a kernel problem, not a "we need a newer distro" problem.
- **Read the release notes.** 26.04 moved core utilities to Rust implementations and dropped some transitional packages; a scripted install that assumed the old behaviour needs revisiting.
- **Version references in automation should use codenames or major numbers with a floating tag, not a point release.** `noble` survives 24.04.x; `24.04.3` does not.

---

## 2. Packages & Components

- **Four components**: `main`, `restricted`, `universe`, `multiverse`. `main` is community-built free software, `universe` is the big community archive, `restricted` is vendor drivers/firmware, `multiverse` is packages with licences requiring extra agreement.
- **`universe` is the pragmatic default for servers.** Refusing it removes a large fraction of available tooling for no security benefit.
- **`apt` interactively, `apt-get` in scripts**, exactly as on Debian — see debian.md for the mechanics, pinning, and `--no-install-recommends`.
- **`apt-mark hold pkg` pins a package** in place. Reach for `/etc/apt/preferences.d/` pinning instead when the hold must survive a script that re-derives the package set.
- **`unattended-upgrades` is configured in `/etc/apt/apt.conf.d/50unattended-upgrades`.** Keep `stable` out of it and let it apply `security` and `*-updates` only, so an unattended run can never push an unreviewed major change.
