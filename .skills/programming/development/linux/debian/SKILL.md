---
name: "debian-linux"
description: "Best practices for administering Debian servers and desktops — apt and dpkg, pinning, releases lifecycle, minimal containers, systemd, and security. Use when provisioning or troubleshooting Debian."
tags:
  - "programming"
  - "development"
  - "linux"
  - "debian"
when_to_use: "Use when provisioning or troubleshooting Debian."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../ubuntu/SKILL.md"
  - "../arch/SKILL.md"
  - "../mint/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
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

- **`--no-install-recommends` matters in images.** Recommends routinely pull a desktop, a web server, and documentation you will never use.

---

## 3. Sources & Pinning

- **One file per source in `/etc/apt/sources.list.d/*.list` or `.sources`** (deb822 format). Never hand-edit a single monolithic list in a provisioning script.
- **Use `https://`**, and install `ca-certificates` first. `http://` repos are a downgrade waiting to happen.
- **Pinning lives in `/etc/apt/preferences.d/`, not in the sources file.** It is the only supported way to hold versions.

```text
# /etc/apt/preferences.d/hold
Package: *
Pin: release n=trixie
Pin-Priority: 1001
```

- **Priority `1001`** means "install from this suite, but never upgrade away from it". `990` prefers it. `500` is normal. `100` allows downgrades. Anything `>1000` is an install-only pin — the most common and least surprising.
- **Backports is the right answer to "I need a newer version".** `apt-get install -t trixie-backports pkg` pulls from testing-adjacent packages without re-pinning the whole system.
- **Adding an arbitrary repository means owning it forever.** Prefer backports; pin the suite narrowly; and never add an untrusted repo without pinning its packages explicitly.

---

## 4. System & Services

- **systemd is the init.** `systemctl enable --now unit` for services, `status` for state, `journalctl -u unit -f` for logs. `-f` follows.
- **`systemctl restart` is a stop-then-start, not a reload.** For long-running services, prefer `reload` when the daemon supports it, or `try-restart` when you only want a restart if it is running.
- **Debug slow boots with `systemd-analyze blame` and `critical-chain`** before optimising anything. Most boot delay is one unit with a bad timeout.
- **Override, never edit shipped unit files.** `systemctl edit unit` writes `/etc/systemd/system/unit.d/override.conf`, which survives package upgrades. Editing `/lib/systemd/system` is undone on the next update.
- **`usrmerge` has been the default since Debian 9** — `/bin`, `/sbin`, and `/usr/bin` are one tree. If a script assumes the old layout, it was already wrong.
- **`/etc` is yours, `/usr` is the package manager's.** Configuration belongs in `/etc`; anything you place under `/usr` that shadows a package file is a bug waiting for a security update.

---

## 5. Users & Permissions

- **Debian installs no `sudo` by default** — you log in as root or use `su -`. For a server, add it deliberately: `adduser deploy && adduser deploy sudo`, then edit sudoers with `visudo`, never with a plain editor.
- **Prefer `adduser` over `useradd`.** Debian's `adduser` is interactive, sane about home directory layout, and gets groups right. `useradd` is the lower-level tool from `passwd`.
- **Give services their own non-login user** (`adduser --system --no-create-home app`) rather than running them as root.
- **`chmod +x` a script before invoking it.** It is the single most common failure in hand-written provisioning.

---

## 6. Containers & CI

- **Use `debian:13-slim` or `debian:trixie-slim` for containers**; `-slim` drops documentation and the extra locale binaries and is markedly smaller than the default image.
- **Install, clean, and drop the apt lists in one layer** — otherwise every image layer carries a package index.
- **Do not run `apt upgrade` in a Dockerfile.** It makes the image unreproducible and silently changes your base. Pin what you need by version and rebuild on a schedule.
- **Debian images run as root by default.** Add a `USER`, and treat this as a requirement in CI images that run untrusted steps.
- **For CI, the release codename beats the number.** `trixie` keeps resolving within the stable series, so your build does not break the day a point release lands.

---

## 7. Security

- **Enable `unattended-upgrades`** (in `stable`/`stable-security`) and keep `stable` pinned out of automatic upgrades if you want security-only automation.
- **Ship an SSH config that disables password auth** before exposing a port. `PermitRootLogin prohibit-password`, `PasswordAuthentication no`, key-only.
- **`debsecan` against security.debian.org** finds packages removed from the archive for vulnerabilities — useful for a long-lived image you have not rebuilt in months.
- **Do not add a repository just to get a newer version of one package** without pinning and a plan to remove it. That is how a server ends up quietly running unaudited code.
- **No proprietary binaries by default.** If you need them, the licence and the update story are yours to own.

---

## 8. Common Pitfalls

- **`apt update` without `apt upgrade`**, leaving people believing packages are current.
- **`pip install` as root on a modern release**, blocked by PEP 668 — use a venv.
- **Editing files under `/usr` or `/lib/systemd/system`**, both overwritten on upgrade.
- **Unpinned third-party repositories**, which silently drag half a dependency tree forward.
- **Running `apt upgrade` in a Dockerfile**, making the image non-reproducible.
- **`apt install` without `--no-install-recommends`** in a container, pulling a desktop into a server image.
- **Assuming a hostname resolves** — set it in `/etc/hostname` and `/etc/hosts` for local resolution.
- **Skipping release notes on a major upgrade**, where defaults and paths genuinely changed.

---

## 9. General Rules of Thumb

- `apt` interactively, `apt-get` in scripts, `dpkg` only to inspect or repair.
- `--no-install-recommends` in images; `DEBIAN_FRONTEND=noninteractive` plus `debconf` preseed in automation.
- Pin through `/etc/apt/preferences.d/`, and prefer backports over new repositories.
- Configure in `/etc`, override systemd units with `systemctl edit`, never by editing shipped files.
- Give every service its own non-root system user.
- Containers on `debian:<codename>-slim`, no `apt upgrade`, non-root `USER`.

---

## Quick-Start Checklist

- [ ] Sources list has `stable`, `stable-updates`, and `stable-security` over `https://`
- [ ] Any third-party repo is pinned via `/etc/apt/preferences.d/`, with an owner
- [ ] `DEBIAN_FRONTEND=noninteractive` set and `tzdata`/`sshd`/`grub-pc` pre-seeded
- [ ] Non-root user with least-privilege `sudo`, managed with `visudo`
- [ ] Services run as dedicated system users, not root
- [ ] systemd overrides done with `systemctl edit`, not by editing `/lib/systemd/system`
- [ ] `unattended-upgrades` configured for security updates
- [ ] SSH is key-only, root login restricted, and the port is not exposed before hardening
- [ ] Containers use `debian:<codename>-slim`, install with `--no-install-recommends`, and set a non-root `USER`
- [ ] Python tooling installed in a venv, never into the system interpreter
- [ ] Release notes read before any major-version upgrade
