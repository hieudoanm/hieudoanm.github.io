# Gauge

Lightweight menu-bar utility for monitoring RAM and disk storage usage at a glance, plus a developer view for managing processes listening on local ports.

## Overview

Gauge is a small native macOS menu-bar utility that answers two questions: _how much memory and storage am I using right now?_ and _what is using this port?_ A compact menu-bar indicator shows current usage, and clicking it opens a popover
with two tabs — **Monitor** (default) for detailed memory, storage, CPU, swap and
system info, and **Ports** for discovering and managing local listeners.

## Features

- **RAM usage** — used / total and percentage, via native Mach VM APIs (`host_statistics64`).
- **Storage usage** — used / total and percentage, via native Foundation filesystem APIs for the boot volume.
- **Menu bar** — compact indicators (e.g. `CPU 39%  Disk 83%`) readable without opening the popover.
- **Popover** — reusable `ResourceMeter` progress bars for memory and storage.
- **Port monitoring** — a dedicated Ports tab lists processes listening on local TCP/UDP ports via `lsof`, with search, copy-paste actions, and graceful (SIGTERM) or force (SIGKILL) termination.
- **Continuous refresh** — a single coordinated refresh (default ~1 s) driven by one shared refresh interval for system metrics and ports.
- **No special permissions** — basic monitoring and port discovery require none.

## Technology

| Layer       | Technology                                            |
| ----------- | ----------------------------------------------------- |
| Language    | Swift 5.9+                                            |
| UI          | SwiftUI + AppKit menu bar                             |
| Memory      | Mach VM APIs (`host_statistics64`)                    |
| Storage     | Foundation volume capacity APIs                       |
| Discovery   | `Process` with explicit exec paths (no shell strings) |
| Testability | `PortDiscovering` / `ProcessTerminating` protocols    |
| Build       | Swift Package Manager                                 |
| Min macOS   | 13 Ventura                                            |

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
PortDiscovery → Service → ViewModel → SwiftUI Ports view
```

Monitoring logic is UI-independent, and port discovery/termination are separated behind `PortDiscovering` / `ProcessTerminating` protocols, so calculations and parsing are unit-testable.

## Documentation

- [Architecture](Docs/ARCHITECTURE.md)
- [Roadmap](Docs/ROADMAP.md)
- [Downloads](Docs/DOWNLOADS.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).