# Overview

Focused reference for **debian-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Debian Best Practices

Debian is the upstream community distribution that Ubuntu, Mint, and most others derive from. Its defining traits are **a frozen stable release, a deliberately conservative policy, and freedom from vendor lock-in** — which makes it the default choice for servers where predictability beats novelty. Practical Debian work leans on **`apt` for daily use and `dpkg` for the underlying truth, pinning when you must hold a version, and `-slim` images for containers**.

_Current stable: Debian 13 "Trixie" (13.7, Sept 2026) — kernel 6.12 LTS, glibc 2.41, GCC 14.2. Full support to 2028-08, LTS to 2030-06._

---

## 1. The Release Lifecycle

- **`stable` is a moving target; codenames are frozen.** A new stable appears roughly every two years, _when the release team signs off_, not on a calendar. Bookworm (12) and Bullseye (11) are still supported alongside Trixie.
- **Three suites per release**: `trixie` (stable), `trixie-updates`, and `trixie-security` from `security.debian.org`. All three belong in your sources list.
- **`forky` is `testing`** — packages that have passed their own tests but not yet the full stable criteria. `sid` is `unstable`, and `experimental` is a fourth, non-autoremovable suite.
- **Read the release notes before upgrading a major version.** Trixie moved to a new init system default for some services, enabled `rust` build tooling, and adopted a new timezone database format. These are the kinds of change that break automation silently.
- **Python is externally managed.** Since Bookworm, `pip install` into the system interpreter errors out by design. Use a virtualenv, or `pipx`/`uv` for tools. This is not a bug to work around with `--break-system-packages`.

---

## 2. Packages: apt vs dpkg

- **`apt` is the interface, `apt-get` and `apt-cache` are the stable scriptable ones.** Use `apt` interactively (it has progress bars) and `apt-get` in scripts and Dockerfiles.
- **`apt update` before anything else.** It refreshes indexes only — it does not install upgrades. Pair it with `apt upgrade` for the two-step habit that survives flaky networks.
- **`apt install` resolves dependencies; `dpkg -i` does not.** Reach for `dpkg` only to inspect (`-l`, `-L`, `-S`), to query ownership (`-S /usr/bin/node`), or when repairing a half-configured package.
- **`apt-get build-dep pkg`** pulls the full build toolchain declared by that source package — far better than guessing build deps.
- **Repair a broken state with `dpkg --configure -a`, then `apt --fix-broken install`.** Neither is a substitute for reading the actual error.
- **Reinstalling a corrupted package is usually faster than debugging it:** `apt-get install --reinstall install pkg`.
- **Set `DEBIAN_FRONTEND=noninteractive` in automation**, and pre-seed anything interactive with `debconf-set-selections` — especially `tzdata`, `sshd`, and `grub-pc`.

```bash
# Minimal, reproducible install
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl git
apt-get clean && rm -rf /var/lib/apt/lists/*
```
