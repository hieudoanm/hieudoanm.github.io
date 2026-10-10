# Implementation notes

Focused reference for **mint-linux**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Flatpak & Desktop Apps

- **Flatpak is the recommended route for desktop applications on Mint**, and Mint integrates it directly. Browser, Spotify, Discord, and most GUI apps are available as Flatpaks and stay current without touching your system.
- **Add Flathub if it is not already present:**

```bash
flatpak remote-add --if-not-exists flathub \
  https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak install flathub org.mozilla.firefox
flatpak update
```

- **Flatpak permissions are a real boundary.** `flatpak override --user --talk-name=org.freedesktop.Notifications <app>` to grant an exception, or use Flatseal when a permission needs explaining to a human.
- **Some apps ship both deb and Flatpak.** Prefer the Flatpak for update cadence; prefer the deb when the app needs host integration (file dialogs, browser plugins, proprietary codecs) that Flatpak sandboxes away.
- **Snap and Flatpak coexist.** This is normal and is not a conflict — but it is two update systems, and only one of them is certification-gated. Know which apps are in which before troubleshooting a version regression.

---

## 7. Desktop Customisation Notes

- **Cinnamon is configured through its own settings applets**, not a single settings file. When scripting desktop changes, prefer dconf/gsettings (`gsettings set org.cinnamon.desktop...`) over editing applets' state files.
- **Theme and icon changes need the right tool.** `update-alternatives` selects the system cursor and editor; Flatseal handles Flatpak theme access. Changing `/usr/share/icons` directly is undone by updates.
- **The Driver Manager, Update Manager, and Backup Tool are the three applets worth learning** before reaching for a terminal.
- **Enable Timeshift's scheduled snapshots on first boot** if this machine matters. Retrofitting a snapshot scheme after an incident is too late.

---

## 8. Containers

- **Mint publishes official images** as `linuxmintd/mint<N>-amd64` (for example `linuxmintd/mint22.3-amd64`), including a `core` variant with no desktop.
- **Use the `core` image for CI.** The full desktop image is several gigabytes of X11 that a build container will never use.
- **No `apt upgrade` in a Dockerfile** — and here the reason is stronger than usual, since the whole point of Mint's policy is that upgrading changes what you get.
- **Prefer a `debian` or `ubuntu` base for containers** unless you specifically need Mint's package set. See ubuntu.md.
