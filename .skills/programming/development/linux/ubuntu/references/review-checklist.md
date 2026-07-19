# Review checklist

Focused reference for **ubuntu-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
