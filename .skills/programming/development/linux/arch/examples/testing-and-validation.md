# Arch Linux Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Read `archlinux.org/news` before a large upgrade
- [ ] `pacman -Syu` run as a single command, never split into `-Sy` then install
- [ ] No `IgnorePkg`/`IgnoreGroup` left over, or every AUR package rebuilt since
- [ ] `mlocate` installed and `pacman -Fy` run if `pacman -F` is used
- [ ] Every AUR `PKGBUILD` read before building; nothing built with `makepkg` as root
- [ ] `updpkgs` scheduled after library updates
- [ ] `mkinitcpio -P` re-run after any `HOOKS` change; a fallback initramfs exists

## Example

A team applying **Quick-Start Checklist** to a Arch Linux Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Read `archlinux.org/news` before a large upgrade**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for arch-linux.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
