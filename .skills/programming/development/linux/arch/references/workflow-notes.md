# Workflow notes

Focused reference for **arch-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Upgrading Safely

- **`pacman -Syu`, always the full thing, always together.** `-Sy` refreshes the database without upgrading, which is precisely what creates a partial upgrade. The `u` is not optional.
- **Partial upgrades are unsupported — this is Arch's hardest rule.** When a library soname bumps, the whole dependency closure is rebuilt together. Upgrading one member gives you a binary linked against a library that no longer exists.
- **Never `pacman -Sy pkg`, and never `pacman -Syuw`.** Both sync the database and stop. `checkupdates` (from `pacman-contrib`) is the safe way to look without syncing.
- **If `-Syu` fails partway, finish it before doing anything else.** The `-Sy` half already succeeded, so the database is ahead of your system. Resolve the error and re-run to completion.
- **Never "fix" a broken library by symlinking.** That is what you do when you do not understand a soname bump. A plain `pacman -Syu` against a good mirror repairs it.
- **Treat `IgnorePkg` and `IgnoreGroup` as sharp tools.** They are how you get a partial upgrade on purpose. If you must hold a package, hold it for one cycle and rebuild every AUR package afterwards.
- **If pacman itself will not run**, install `pacman-static` from the AUR — it is statically linked and does not need the libraries your system is missing.

```bash
# Safe: check without syncing, then upgrade fully
checkupdates                       # read-only, safe any time
sudo pacman -Syu                   # the one command that should be routine
sudo pacman -Syu --needed          # skip up-to-date packages, still a full upgrade
```

---

## 4. AUR & PKGBUILDs

- **The AUR is not the repositories.** It is user-submitted build recipes with no vetting, no signing, and no guarantee the maintainer is still around. Official `pacman -S` always wins when both exist.
- **Read the `PKGBUILD` before building.** It is a shell script. If you cannot read it and confirm what it installs, do not run it — that review is the entire security model of the AUR.
- **Never run `makepkg` as root.** It refuses by design, and for good reason: the build runs arbitrary code from the PKGBUILD as your user. Build as a normal user, install as root with `pacman -U`.
- **`makepkg -si` builds then installs.** `--syncdeps` pulls missing dependencies from the repos first, which is what you want almost every time.
- **`updpkgs` rebuilds everything after a soname bump.** Locally built packages are the casualty of every library upgrade; this is not optional maintenance on Arch.
- **AUR helpers (`paru`, `yay`) are conveniences, not safety.** They still execute a PKGBUILD you did not read. Read the recipe in your pager first.
- **Check whether a package needs a service enabled.** A PKGBUILD that installs a unit file does not start it: `systemctl enable --now unit` is on you.

```bash
git clone https://aur.archlinux.org/pkg.git && cd pkg
less PKGBUILD                 # read this before anything else
makepkg -si                   # build as your user, then install with pacman -U
updpkgs                       # rebuild all AUR packages after a library bump
```

---

## 5. Kernel, Initramfs & Boot

- **`linux` + `linux-firmware` are the defaults.** `linux-lts` and `linux-zen` are separate packages you can hold instead, but two kernels sharing one bootloader config is a common way to get an unbootable box.
- **`mkinitcpio` builds the initramfs**, and it is the single most fragile part of an Arch install. Its `HOOKS` line is what decides whether your root filesystem is discoverable at boot.
- **Rebuild after every hook change: `mkinitcpio -P`.** A wrong `HOOKS` line can still produce a bootable image that works right now and fails on the next kernel update — the classic latent ZFS/btrfs failure.
- **Use the standard `HOOKS` order** unless you have a concrete reason. `autodetect` must come after `modconf` and before the block/filesystem hooks, or the image will not find root.
- **Keep a fallback initramfs.** A `fallback` preset built with `-S autodetect` is what saves you when the automatic one misdetects a RAID array or an encrypted volume.
- **Bootloader is separate from the kernel and yours to rebuild.** `grub-mkconfig -o /boot/grub/grub.cfg` after any `/etc/default/grub` change; `systemd-boot` writes entries to the ESP. Never hand-edit a generated config.
- **Watch `/boot` free space.** Fallback images double the kernel footprint, and a full `/boot` is an unbootable system with no warning.
- **Recovery is `arch-chroot`, not a live USB reinstall.** Mount the partitions, then `arch-chroot /mnt` and fix it with a working pacman.

---
