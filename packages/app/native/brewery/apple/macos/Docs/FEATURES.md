# Features

Brewery is a Homebrew GUI with a three-column navigation split view.

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
