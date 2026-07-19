# Arch Linux Best Practices: Workflow Checklist

A practical run sheet for applying [Arch Linux Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. The Rolling Model: **There is no release to hold.** Arch ships one continuously updated tree; a machine is either current or behind. "Which Arch version are you on" has no answer beyond "how far behind are you"
- [ ] 1. The Rolling Model: **A rolling distro is a maintenance commitment, not a one-time install.** An unattended Arch box accumulates breakage. If nobody will ever run pacman -Syu on it, it should not be Arch
- [ ] 2. pacman: **pacman is one tool for everything.** There is no apt-get/apt-cache split to remember: pacman -S install, -R remove, -U local file, -Q query, -F file search, -D database
- [ ] 2. pacman: **-Q is where you actually live.** pacman -Qi pkg for metadata, -Ql for a package's files, -Qo /path to find which package owns a file, -Qdtq for orphans, -Qkk to verify every file's checksum
- [ ] 3. Upgrading Safely: **pacman -Syu, always the full thing, always together.** -Sy refreshes the database without upgrading, which is precisely what creates a partial upgrade. The u is not optional
- [ ] 3. Upgrading Safely: **Partial upgrades are unsupported — this is Arch's hardest rule.** When a library soname bumps, the whole dependency closure is rebuilt together. Upgrading one member gives you a binary linked against a library that no longer exists
- [ ] 4. AUR & PKGBUILDs: **The AUR is not the repositories.** It is user-submitted build recipes with no vetting, no signing, and no guarantee the maintainer is still around. Official pacman -S always wins when both exist
- [ ] 4. AUR & PKGBUILDs: **Read the PKGBUILD before building.** It is a shell script. If you cannot read it and confirm what it installs, do not run it — that review is the entire security model of the AUR
- [ ] 5. Kernel, Initramfs & Boot: **linux + linux-firmware are the defaults.** linux-lts and linux-zen are separate packages you can hold instead, but two kernels sharing one bootloader config is a common way to get an unbootable box
- [ ] 5. Kernel, Initramfs & Boot: **mkinitcpio builds the initramfs**, and it is the single most fragile part of an Arch install. Its HOOKS line is what decides whether your root filesystem is discoverable at boot

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
