# Implementation notes

Focused reference for **ubuntu-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **snap is a second package system** with automatic background updates, independent versioning, and confinement. It is installed by default, including on server images.
- **The decision is yours, not snapd's.** A snap that auto-updates outside a change window is exactly what some regulated environments cannot accept, and the escape route is `snap set system refresh.hold=true` plus a controlled refresh schedule.
- **On servers, prefer deb where an equivalent exists** — snaps add a daemon, an indirection, and confinement diagnostics to debug. Snap is strongest for desktop apps with frequent upstream releases.
- **Remove snapd properly if you remove snaps:** `apt purge snapd`, then drop `/etc/apt/sources.list.d/snapd.list`. Leaving the repo behind breaks `apt update` on the next Ubuntu release.
- **`snap list --all` then `snap remove name --revision=N`** to clear disabled revisions, which otherwise accumulate indefinitely.

---

## 6. Security & Firewall

- **UFW is the default front-end firewall and it is disabled on fresh images.** `ufw default deny incoming && ufw allow 22 && ufw allow OpenSSH && ufw enable` is the minimum for any public host.
- **Allow the SSH port before enabling UFW**, or you will lock yourself out. The `ufw allow OpenSSH` form survives a port change; the numeric one does not.
- **UFW only filters host traffic** — it does not protect a container or a load balancer in front of it. Security groups still belong in your cloud provider.
- **AppArmor is enforcing by default** and profiles ship with packages. Do not disable it globally to work around one misbehaving daemon; put that daemon in complain mode instead.
- **Ubuntu Pro (`pro attach`)** buys ESM for packages on versions past standard support, plus CVE scanning and compliance tooling. For anything with a long life, it is cheap insurance.
- **LXD or snap-based container tooling is a real choice, not a default.** Plain `docker` from Docker's own repository is usually simpler for a single-purpose server.

---

## 7. Cloud & Containers

- **Use `ubuntu:26.04` for containers**, and prefer `-noble` if you want patch-level updates without a rebuild. Avoid point-release tags in anything reproducible.
- **cloud-init runs on first boot and configures the user, SSH keys, and netplan.** It is powerful and slow; if you supply a baked cloud-config, disable it so it cannot overwrite your image at boot.
- **A cloud image expects to grow its partition on first boot.** In a container that never happens, which is fine — but do not copy a cloud image into a container and expect the resize logic to be useful.
- **No `apt upgrade` in a Dockerfile**, for the same reproducibility reason as Debian, plus the added risk of an unattended-upgrades change landing mid-build.

---

## 8. Common Pitfalls
