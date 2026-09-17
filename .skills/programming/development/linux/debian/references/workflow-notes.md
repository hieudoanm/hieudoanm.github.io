# Workflow notes

Focused reference for **debian-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
