# Implementation notes

Focused reference for **debian-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
