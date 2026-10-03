---
name: arch-linux
description: Best practices for administering Arch Linux — pacman, the no-partial-upgrade rule, AUR and PKGBUILDs, kernel/initramfs/bootloader management, .pacnew config drift, and rollback. Use when installing, upgrading, or troubleshooting Arch or an Arch-based system.
---

# Arch Linux Best Practices

Arch is the distribution that refuses to make your life easy so that nothing gets in the way of the current upstream release. Its defining traits are **a single rolling release with no versions, a package manager that will not let you upgrade halfway, and a user-owned ecosystem in the AUR** — which makes it the ideal daily driver for a developer and a poor fit for anything you cannot personally fix. Practical Arch work leans on **`pacman -Syu` as an atomic habit, reading a PKGBUILD before you build it, and treating `/etc` drift as a queue you must work through**.

_Verified Sept 2026: rolling release, no pinning possible. Installer `2026.09.01`, kernel `7.2.x`, `pacman 7.1.0`, `linux-firmware 20260410-1` (a single "Default set" package again — the 2025 vendor split was reverted)._

---

## 1. The Rolling Model

- **There is no release to hold.** Arch ships one continuously updated tree; a machine is either current or behind. "Which Arch version are you on" has no answer beyond "how far behind are you".
- **A rolling distro is a maintenance commitment, not a one-time install.** An unattended Arch box accumulates breakage. If nobody will ever run `pacman -Syu` on it, it should not be Arch.
- **You cannot pin anything.** There is no equivalent of `apt` pinning, no LTS, no backports. `IgnorePkg` is the only mechanism and it silently manufactures the partial upgrades Arch explicitly refuses to support.
- **Read the Arch news feed before a big upgrade** — `archlinux.org/news`. Package renames and removals land there ahead of the repos, and that is the only warning you get.
- **Major changes are unversioned and unannounced as a set.** glibc, GCC, and the kernel all track upstream. When a soname bumps, every locally built package must be rebuilt or it will break at runtime.

---

## 2. pacman

- **`pacman` is one tool for everything.** There is no `apt-get`/`apt-cache` split to remember: `pacman -S` install, `-R` remove, `-U` local file, `-Q` query, `-F` file search, `-D` database.
- **`-Q` is where you actually live.** `pacman -Qi pkg` for metadata, `-Ql` for a package's files, `-Qo /path` to find which package owns a file, `-Qdtq` for orphans, `-Qkk` to verify every file's checksum.
- **`-F` needs a file database** you do not have by default. Install `mlocate`, run `updatedb`, and refresh with `pacman -Fy` — otherwise `pacman -F` searches nothing.
- **Remove with `-Rns`**, never bare `-R`. It drops the now-unneeded dependencies (`-s`) and the config backup (`.pacsave`, `n`).
- **Never pass `--nodeps`.** It is the single fastest way to produce a system where `pacman` itself cannot run. If a dependency conflict genuinely blocks you, the answer is `pacman -Syu`.
- **Avoid `--overwrite`** unless Arch developers explicitly instructed it. It disables the file-conflict check that is protecting you.
- **`pacman -Qdtq | pacman -Rns -` cleans orphans** — packages installed as dependencies that nothing needs any more. Run it occasionally; it is safe, unlike `--nodeps`.

```bash
pacman -Qi linux              # metadata: version, repo, licence, size
pacman -Qo /usr/bin/bash      # which package owns this file
pacman -Ql systemd | wc -l    # what did this package install
pacman -Qkk                  # verify checksums of every installed file
pacman -Ss ripgrep           # search repos (NOT the AUR)
```

---

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

## 6. Config Files & Drift

- **Pacman never overwrites your edited config.** A changed upstream file arrives as `foo.conf.pacnew`, and your version stays. That is a deliberate safety net and also a permanent maintenance queue.
- **`pacdiff` from `pacman-contrib` is the right way to work through them** — it gives you a side-by-side merge instead of a raw diff.
- **Find the backlog with `find /etc -name '*.pac*'`**, and keep the mirrorlist one short, since it changes constantly.
- **`NoUpgrade` in `pacman.conf` stops a file you never want touched** from even generating a `.pacnew`. Use it for genuinely machine-local files.
- **`/etc` is yours, `/usr` is pacman's.** Anything you place under `/usr` that shadows a package file will be overwritten and may be listed in a future `.pacnew`.
- **`pacman.conf` holds the settings you will actually change**: `IgnorePkg`, `NoUpgrade`, mirror order, `ParallelDownloads`, and `CleanMethod`.

```bash
sudo pacman -Syu pacman-contrib
find /etc -name '*.pacnew' -o -name '*.pacsave' | sort
sudo pacdiff                       # merge each one deliberately
```

---

## 7. Maintenance & Rollback

- **Prune the cache with `paccache`, not `rm`.** `paccache -rk3` keeps three versions of each package and frees the rest. Plain `pacman -Sc` removes everything and destroys your rollback points.
- **`/var/cache/pacman/pkg/` holds every package you ever installed**, which is what makes downgrade possible without a separate backup.
- **Roll back with `pacman -U /var/cache/pacman/pkg/<old>.pkg.tar.zst`.** For multi-package rollbacks the `downgrade` AUR helper automates it.
- **Keep `/boot` and `/etc` in version control or a snapshot.** A `timeshift`/`snapper` snapshot before a kernel or glibc bump is the cheapest insurance on any distro.
- **Automate the check, not the upgrade.** A `systemd-timer` or cron entry running `checkupdates` and mailing you is safe unattended; a timer running `pacman -Syu` unattended is not.
- **`systemd-analyze blame` before optimising boots.** Arch is already minimal, so most boot delay is one misconfigured unit rather than missing bloat.
- **`pacman -Qdtq` and `paccache` on a schedule**; neither is urgent, and both are safe to automate.

---

## 8. Containers & CI

- **There is no official Arch image, and `archlinux/base` is a poor CI base.** It carries no `pacman` cache and must run a full `pacman -Syu` on every single invocation, so it is neither reproducible nor fast.
- **If you must, pin the base by digest** and treat the upgrade as an explicit, cached step — never let it float, or your build changes under you.
- **Prefer a static binary or a distroless/Fedora/Ubuntu base for CI.** Arch in a build image buys you nothing and costs a network round-trip per layer.
- **For containers, systemd services are the exception, not the rule.** `docker run` gets one process; if you need a supervisor you have left the container model.
- **`archlinuxarm` exists for ARM**, including `archlinuxarm/base` — but the AUR is architecture-specific, so an AUR package that built on x86_64 will not transfer.
- **Never build AUR packages in CI without a cache.** Every run re-downloads and re-builds, and any failure is a network failure, not a code failure.

---

## 9. Security

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
