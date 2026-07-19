# Review checklist

Focused reference for **debian-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
