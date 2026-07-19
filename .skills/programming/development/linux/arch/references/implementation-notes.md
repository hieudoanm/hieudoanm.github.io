# Implementation notes

Focused reference for **arch-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
