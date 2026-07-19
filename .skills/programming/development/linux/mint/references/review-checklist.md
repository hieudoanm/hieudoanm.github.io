# Review checklist

Focused reference for **mint-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 9. Common Pitfalls

- **`sudo apt upgrade`,** which bypasses certification and is the most common way to break a Mint machine.
- **Treating timeshift as a backup**, and discovering that during a disk failure.
- **Running `mintupgrade` without snapshots,** or with held/third-party packages still installed.
- **DKMS modules failing silently under secure boot** because the key is not enrolled.
- **Mixing LMDE and Ubuntu-based advice,** which produces lockfile and repository confusion.
- **Expecting kernel `linux-headers` to follow a kernel update** automatically; they do not.
- **Installing a Flatpak for an app that needs host integration,** then debugging the sandbox instead of the app.
- **Using the desktop image in CI,** paying gigabytes for a X server that never starts.

---

## 10. General Rules of Thumb

- Update through the Update Manager, never raw `apt upgrade`; keep the certification gate intact.
- Snapshot with timeshift before any large change, and back up your data somewhere else.
- Upgrade across releases only with `mintupgrade`, one major version at a time.
- Flatpak for desktop apps, apt for system integration, and know which is which.
- Take drivers from Driver Manager and match `linux-headers` to the running kernel.
- Server or container work belongs on Debian or Ubuntu, not here.

---

## Quick-Start Checklist

- [ ] Edition (Cinnamon / MATE / XFCE / LMDE) chosen deliberately at install
- [ ] Update Manager used for all updates; `apt upgrade` reserved for reading with `apt list --upgradable`
- [ ] Refresh policy configured so the certification queue is respected
- [ ] Timeshift scheduled snapshots enabled, with a retention limit and free space confirmed
- [ ] A real, tested backup exists for anything timeshift does not cover (`/home`)
- [ ] Third-party repositories purged before any release upgrade
- [ ] `mintupgrade check` run, then `mintupgrade` one major version at a time
- [ ] `linux-headers-$(uname -r)` installed before any DKMS module is built
- [ ] Secure boot key enrolled if a DKMS module is required at boot
- [ ] Flathub added; Flatpak permissions reviewed for anything needing host access
- [ ] Snap vs Flatpak vs deb inventoried per application
- [ ] Containers use `linuxmintd/mint<N>-amd64-core`, or a Debian/Ubuntu base
