# Overview

Focused reference for **arch-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
