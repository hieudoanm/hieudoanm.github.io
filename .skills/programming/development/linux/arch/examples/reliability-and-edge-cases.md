# Arch Linux Best Practices: 9. Security

## Source guidance

This example applies the **9. Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **No `unattended-upgrades` equivalent exists.** Automatic major upgrades are structurally unsafe on a rolling distro. You own the upgrade cadence, so schedule it.
- **`sudo` is not installed by default** — you get root via `su -`. On a desktop, install it deliberately and keep the `wheel` rule (`%wheel ALL=(ALL:ALL) ALL`) in `sudoers`, edited with `visudo`.
- **Give services their own system users.** Arch does not create them for you the way a server distro might, and running a daemon as root is entirely possible if you let it.
- **`pacman -Fy` + `pacman -F` to trace a file** when auditing — after `updatedb` from `mlocate`.

## Example

A team applying **9. Security** to a Arch Linux Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****No `unattended-upgrades` equivalent exists.** Automatic major upgrades are structurally unsafe on a rolling distro. You own the upgrade cadence, so schedule it.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for arch-linux.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
