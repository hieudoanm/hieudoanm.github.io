# Brewery

## Installation

Brewery is built from source. Release `.app` / `.dmg` artifacts published here correspond to the latest stable build.
> **Note for local use:** the app is ad-hoc signed. To open it after running Gatekeeper's first-run check, right-click the app and choose **Open**, or enable the app in **System Settings → Privacy & Security**.
## Latest
- Brewery.dmg — universal x86_64 / arm64
## Upstream
Homebrew is the source of truth and is not bundled; install it from <https://brew.sh/>.

## About

Brewery is a Homebrew GUI with a three-column navigation split view.

## Features

## Screens

### Discover
- Search Homebrew formulae and casks by name.
- Per-formula and per-cask search tabs.
- Install a package or view details.

### Installed
- Lists installed formulae and casks (tabs).
- Sorted alphabetically.
- Inspect/upgrade/uninstall individual packages.

### Updates
- Refresh Homebrew metadata (`brew update`).
- Lists outdated packages with current vs. installed versions.
- Upgrade individual packages or upgrade all at once.

### Services
- Lists Homebrew services with status (started / stopped / error).
- Start, stop, and restart services.

### Settings
- Launch-at-login toggle.
- Auto-check-for-updates toggle.

## Package states

Each package carries one of:

- **Installed** — present at a matching/newer version.
- **Outdated** — installed, but the current version differs.
- **Not installed** — not present.

## Distinguishing type

All views and models distinguish **Formulae** (CLI tools) from **Casks** (GUI apps) using `PackageType`, surfaced with distinct badges and per-type tabs.

## LICENSE

See [LICENSE](LICENSE).
