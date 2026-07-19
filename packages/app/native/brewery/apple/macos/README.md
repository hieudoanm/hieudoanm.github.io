# Brewery

Native macOS GUI for Homebrew — discover, install, update, and manage formulae, casks, and services.

## Overview

Brewery is a native SwiftUI application that presents a graphical interface over [Homebrew](https://brew.sh/). Homebrew remains the source of truth: Brewery never duplicates package-management logic or keeps its own package database — it simply invokes `brew` and presents the results.

## Features

- **Discover** — search Homebrew formulae and casks, then install from the app.
- **Installed** — browse installed packages (formulae vs. casks in separate tabs), inspect, upgrade, or uninstall individual packages.
- **Updates** — refresh Homebrew metadata and upgrade outdated packages, individually or all at once.
- **Services** — list Homebrew services and start, stop, and restart them.
- **Settings** — launch-at-login and auto-check-for-updates preferences.

## Technology

| Layer       | Technology                                                                |
| ----------- | ------------------------------------------------------------------------- |
| Language    | Swift 5.9+                                                                |
| UI          | SwiftUI (`NavigationSplitView` window app)                                |
| Homebrew    | Invoked directly via `Process` (no shell interpolation)                   |
| Parsing     | `brew info --json=v2`, `brew outdated --json=v2`, columnar service output |
| Testability | `BrewClient` protocol with `SystemBrewClient` / `MockBrewClient`          |
| Persistence | Codable JSON (UserDefaults / Application Support)                         |
| Build       | Swift Package Manager                                                     |
| Min macOS   | 13 Ventura                                                                |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble Brewery.app bundle
make dmg       # Build a .dmg
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```txt
UI (SwiftUI) → BreweryViewModel → BrewService → BrewClient → brew
```

Domain logic lives in the UI-independent `BreweryCore` library; the SwiftUI layer is a thin presentation on top.

## Documentation

- [Architecture](Docs/ARCHITECTURE.md)
- [Features](Docs/FEATURES.md)
- [Roadmap](Docs/ROADMAP.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).
