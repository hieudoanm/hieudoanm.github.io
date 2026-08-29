# Gauge

Lightweight menu-bar utility for monitoring RAM and disk storage usage at a glance.

## Overview

Gauge is a small native macOS menu-bar utility that answers one question: _how much memory and storage am I using right now?_ A compact menu-bar indicator shows current usage, and clicking it opens a popover with detailed memory and storage information.

## Features

- **RAM usage** — used / total and percentage, via native Mach VM APIs (`host_statistics64`).
- **Storage usage** — used / total and percentage, via native Foundation filesystem APIs for the boot volume.
- **Menu bar** — compact indicators (e.g. `RAM 39%  Disk 83%`) readable without opening the popover.
- **Popover** — reusable `ResourceMeter` progress bars for memory and storage.
- **Continuous refresh** — ~1 s coordinated refresh with negligible CPU overhead.
- **No special permissions** — basic monitoring requires none.

## Technology

| Layer     | Technology                         |
| --------- | ---------------------------------- |
| Language  | Swift 5.9+                         |
| UI        | SwiftUI + AppKit menu bar          |
| Memory    | Mach VM APIs (`host_statistics64`) |
| Storage   | Foundation volume capacity APIs    |
| Build     | Swift Package Manager              |
| Min macOS | 13 Ventura                         |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble Gauge.app bundle
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```txt
SystemMonitor → MemoryMonitor / DiskMonitor → observable state → SwiftUI menu bar / popover
```

Monitoring logic is UI-independent so calculations and formatting are unit-testable.

## Documentation

- [Features](Docs/FEATURES.md)
- [Architecture](Docs/ARCHITECTURE.md)
- [Roadmap](Docs/ROADMAP.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).
