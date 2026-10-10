# Workflow notes

Focused reference for **ubuntu-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
