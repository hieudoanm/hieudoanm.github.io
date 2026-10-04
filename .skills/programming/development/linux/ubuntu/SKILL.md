---
name: ubuntu-linux
description: Best practices for administering Ubuntu servers and desktops — apt components, PPAs, netplan, snaps, unattended-upgrades, cloud images, and LTS upgrades. Use when provisioning or troubleshooting Ubuntu.
---

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
- **`apt` interactively, `apt-get` in scripts**, exactly as on Debian — see [debian.md](./debian.md) for the mechanics, pinning, and `--no-install-recommends`.
- **`apt-mark hold pkg` pins a package** in place. Reach for `/etc/apt/preferences.d/` pinning instead when the hold must survive a script that re-derives the package set.
- **`unattended-upgrades` is configured in `/etc/apt/apt.conf.d/50unattended-upgrades`.** Keep `stable` out of it and let it apply `security` and `*-updates` only, so an unattended run can never push an unreviewed major change.

---

## 3. PPAs & Third-Party Sources

- **`add-apt-repository ppa:owner/name` is the sanctioned path** — install `software-properties-common` first, then add, `apt update`, install.
- **Adding a PPA grants that maintainer root over your package graph** for the lifetime of the source. Judge it like any other root-level dependency.
- **A PPA's `uninstall` removes the repo but not the packages it installed.** Removing the packages themselves is a separate, manual step, and it is the step people forget.
- **Use `deadsnakes` only if you need a Python the distro does not ship** — building from source is usually more honest for a server.
- **`ppa:ubuntu-backports` is the low-risk option** when you need a newer version of a standard package, and it carries Canonical's own review rather than a third party's.

---

## 4. Networking: netplan

- **netplan owns network configuration** on Ubuntu Server (18.04+). Files live in `/etc/netplan/*.yaml`; changes are applied with `netplan apply`.
- **Always `netplan try` over ssh.** It applies the config and reverts automatically if you do not confirm within the timeout — the one command that makes remote netplan edits survivable.
- **`netplan generate` validates without applying.** Use it in CI and before every apply.
- **The renderer matters.** `renderer: networkd` uses `systemd-networkd`; `renderer: NetworkManager` targets desktops. Setting the wrong one produces a config that parses and does nothing.
- **DNS goes through `systemd-resolved`**, and `/etc/resolv.conf` is a symlink to its stub at `127.0.0.53`. Programs that write to `/etc/resolv.conf` directly will lose their change on reboot — set DNS in netplan instead.
- **Set the hostname in two places** if you want local resolution: `/etc/hostname` and a matching line in `/etc/hosts`.

```yaml
# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: true
      dhcp4-overrides:
        use-dns: false
      nameservers:
        addresses: [1.1.1.1, 9.9.9.9]
```

---

## 5. Snaps

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

- **Leaving UFW disabled on a public host**, which is the Ubuntu default on cloud images.
- **Running `netplan apply` over ssh instead of `netplan try`,** losing the session on a typo.
- **Writing `/etc/resolv.conf` directly** and losing the change to `systemd-resolved` on reboot.
- **Adding a PPA and never removing its packages** when the repo is gone.
- **Purging `snapd` without removing `snapd.list`**, which breaks `apt update` on the next release upgrade.
- **Unattended-upgrades configured for `stable`**, letting an automated run push a major version.
- **Building production on an interim release** — it has nine months of support and no HWE kernel.
- **Using a point-release Docker tag**, so builds drift or break unpredictably.

---

## 9. General Rules of Thumb

- LTS only in production, and upgrade with `do-release-upgrade` from a clean machine.
- Prefer `universe` and `ppa:ubuntu-backports` before reaching for a third-party PPA.
- netplan for all network config, `netplan try` over ssh, DNS through resolved.
- UFW on with the SSH rule added first; security groups still apply in cloud.
- Decide about snapd explicitly and record the decision, because it updates on its own schedule.
- Containers on `ubuntu:<codename>`, no `apt upgrade`, cloud-init disabled when you bake your own config.

---

## Quick-Start Checklist

- [ ] Deployed an LTS release, not an interim one
- [ ] SSH hardened (key-only, root restricted) before the port is exposed
- [ ] `ufw default deny incoming`, `ufw allow OpenSSH`, then `ufw enable`
- [ ] netplan config in `/etc/netplan/`, validated with `netplan generate`, applied with `netplan try`
- [ ] DNS configured in netplan, not written into `/etc/resolv.conf`
- [ ] Hostname set in `/etc/hostname` and `/etc/hosts`
- [ ] `unattended-upgrades` scoped to `security` and `*-updates` only
- [ ] Every PPA inventoried, with a plan to remove the packages it pulled in
- [ ] snapd either intentionally configured with a refresh policy or fully purged
- [ ] Ubuntu Pro / ESM considered for anything with a multi-year horizon
- [ ] Containers use `ubuntu:<codename>`, no `apt upgrade`, non-root `USER`
- [ ] cloud-init disabled or verified when supplying a baked cloud-config
