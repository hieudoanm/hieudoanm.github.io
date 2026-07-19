# Linux Mint Best Practices: 6. Flatpak & Desktop Apps

## Source guidance

This example applies the **6. Flatpak & Desktop Apps** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Flatpak is the recommended route for desktop applications on Mint**, and Mint integrates it directly. Browser, Spotify, Discord, and most GUI apps are available as Flatpaks and stay current without touching your system.
- **Add Flathub if it is not already present:**
- **Flatpak permissions are a real boundary.** `flatpak override --user --talk-name=org.freedesktop.Notifications <app>` to grant an exception, or use Flatseal when a permission needs explaining to a human.

## Example

```bash
flatpak remote-add --if-not-exists flathub \
  https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak install flathub org.mozilla.firefox
flatpak update
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mint-linux.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
