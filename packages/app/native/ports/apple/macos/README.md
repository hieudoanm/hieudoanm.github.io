# Ports

Fast, local-first macOS menu-bar utility for discovering and managing processes listening on local ports.

## Overview

Ports is a native macOS menu-bar utility for developers. When something's wrong with your dev server, it answers: _what is using port 3000?_ — showing the owning process, its project, opening it in a browser, and killing it when needed, all without touching the terminal.

## Features

- **Port discovery** — list processes listening on local TCP/UDP ports with process name and PID.
- **Automatic refresh** — the list updates as servers start and stop.
- **Search** — by port, process name, PID, project, or command.
- **Actions** — open in browser (`NSWorkspace`), copy address/port/PID, kill gracefully (SIGTERM) with an explicit force-kill option.
- **Developer context** — best-effort project detection (package.json, go.mod, Cargo.toml, …) and process tree.
- **Local-first** — no telemetry; process/port data never leaves the machine.

## Technology

| Layer       | Technology                                            |
| ----------- | ----------------------------------------------------- |
| Language    | Swift 5.9+                                            |
| UI          | SwiftUI + AppKit menu bar                             |
| Discovery   | `Process` with explicit exec paths (no shell strings) |
| Open/copy   | NSWorkspace / NSPasteboard                            |
| Testability | `PortDiscovering` protocol with mock services         |
| Build       | Swift Package Manager                                 |
| Min macOS   | 13 Ventura                                            |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble Ports.app bundle
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```txt
PortDiscovery → Service → ViewModel → SwiftUI menu-bar popover
```

Discovery, process info, and project detection are separate, UI-independent services.

## Documentation

- [Features](Docs/FEATURES.md)
- [Architecture](Docs/ARCHITECTURE.md)
- [Roadmap](Docs/ROADMAP.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).
