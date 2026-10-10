# Review checklist

Focused reference for **arch-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **No `unattended-upgrades` equivalent exists.** Automatic major upgrades are structurally unsafe on a rolling distro. You own the upgrade cadence, so schedule it.
- **`sudo` is not installed by default** — you get root via `su -`. On a desktop, install it deliberately and keep the `wheel` rule (`%wheel ALL=(ALL:ALL) ALL`) in `sudoers`, edited with `visudo`.
- **Give services their own system users.** Arch does not create them for you the way a server distro might, and running a daemon as root is entirely possible if you let it.
- **`pacman -Fy` + `pacman -F` to trace a file** when auditing — after `updatedb` from `mlocate`.
- **`pacman -Qkk` after a suspected compromise**, and diff the result against a known-good manifest.
- **Treat an AUR package as unreviewed third-party code** even when it is one you have installed for a year. Re-read the `PKGBUILD` when the build fails — that is often when upstream changed something significant.
- **Do not expose a rolling-release box to the internet on its own.** Arch assumes a competent local administrator; an unattended one is an accumulating liability.

---

## 10. Common Pitfalls

- **`pacman -Sy pkg`**, the defining Arch error — it desynchronises the database from the system and manufactures a partial upgrade.
- **`makepkg` as root**, executing untrusted build code with full privileges.
- **Building an AUR package without `updpkgs` after a library bump**, then debugging a "random" segfault.
- **Skimming the `PKGBUILD`**, which is the only review the AUR model offers you.
- **Editing a `.pacnew` backlog until it is ignored**, leaving months of upstream config changes unapplied.
- **`IgnorePkg` left in place "temporarily"**, quietly breaking the upgrade invariant forever.
- **`pacman -Sc` or a manual cache wipe**, deleting every rollback point at once.
- **Hand-editing a generated bootloader config**, which the next `grub-mkconfig` overwrites.
- **Forgetting `mkinitcpio -P` after editing `HOOKS`**, producing an initramfs that breaks at the next kernel update rather than now.
- **Letting `/boot` fill up** with kernels and fallback images, ending in an unbootable machine.
- **Symlinking a missing library** instead of running `pacman -Syu`, turning a solvable problem into a permanent one.
- **Using Arch as a CI base**, making every build a fresh full-system upgrade.

---

## General Rules of Thumb

- `pacman -Syu` as one atomic command, frequently; `checkupdates` when you only want to look.
- Never `pacman -Sy pkg`, never `--nodeps`, rarely `--overwrite`.
- Read every `PKGBUILD`; build as a normal user; `updpkgs` after any soname bump.
- Official repositories over the AUR, always.
- `mkinitcpio -P` after touching `HOOKS`; rebuild the bootloader after touching its config; keep a fallback image and watch `/boot`.
- Work the `.pacnew` backlog with `pacdiff` on a schedule.
- Keep the package cache — `paccache -rk3`, never a full wipe — so rollback is always available.
- Snapshot before any kernel or glibc bump.

---

## Quick-Start Checklist

- [ ] Read `archlinux.org/news` before a large upgrade
- [ ] `pacman -Syu` run as a single command, never split into `-Sy` then install
- [ ] No `IgnorePkg`/`IgnoreGroup` left over, or every AUR package rebuilt since
- [ ] `mlocate` installed and `pacman -Fy` run if `pacman -F` is used
- [ ] Every AUR `PKGBUILD` read before building; nothing built with `makepkg` as root
- [ ] `updpkgs` scheduled after library updates
- [ ] `mkinitcpio -P` re-run after any `HOOKS` change; a fallback initramfs exists
- [ ] Bootloader config regenerated, never hand-edited; `/boot` has headroom
- [ ] `.pacnew` backlog at zero, reviewed with `pacdiff`
- [ ] Cache pruned with `paccache -rk3`, rollback path understood
- [ ] Snapshot or version control on `/etc` and `/boot`
- [ ] Upgrade cadence owned by a human; automation runs `checkupdates`, not `pacman -Syu`
- [ ] Services run as their own system users; `sudoers` edited only via `visudo`
- [ ] CI images not based on `archlinux/base`, or pinned by digest with a cached upgrade step
