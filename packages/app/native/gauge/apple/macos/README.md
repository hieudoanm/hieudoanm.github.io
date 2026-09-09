# Gauge

Lightweight menu-bar utility for monitoring RAM and disk storage usage at a glance, with dedicated views for live network throughput, managing processes listening on local ports, and a clipboard history that never loses a copy.

## Overview

Gauge is a small native macOS menu-bar utility that answers three questions: _how much memory and storage am I using right now?_, _what is using this port?_, and _where did that thing I copied go?_ A compact menu-bar indicator shows current usage, and clicking it opens a popover with four tabs — **Clipboard** for searchable copy history, **Memory** (default) for detailed memory, storage, CPU, swap and system info, **Network** for live download/upload throughput and per-interface traffic, and **Ports** for discovering and managing local listeners.

## Features

- **RAM usage** — used / total and percentage, via native Mach VM APIs (`host_statistics64`).
- **Storage usage** — used / total and percentage, via native Foundation filesystem APIs for the boot volume.
- **Menu bar** — compact indicators (e.g. `CPU 39%  Disk 83%`) readable without opening the popover.
- **Popover** — reusable `ResourceMeter` progress bars for memory and storage.
- **Port monitoring** — a dedicated Ports tab lists processes listening on local TCP/UDP ports via `lsof`, with search, copy-paste actions, and graceful (SIGTERM) or force (SIGKILL) termination.
- **Clipboard history** — a dedicated Clipboard tab captures everything you copy, with search, re-copy, pin, delete, and clear-unpinned; stored locally at `Application Support/Clipper/clipboard.json`.
- **Network monitoring** — a dedicated Network tab shows live download/upload rates, session totals, and per-interface traffic with Wi-Fi/Ethernet classification via `getifaddrs` + IOKit.
- **Continuous refresh** — a single coordinated refresh (default ~1 s) driven by one shared refresh interval for system metrics, ports, and network; clipboard history polls the pasteboard change count every 0.5 s.
- **No special permissions** — basic monitoring, port discovery, and clipboard history require none.

## Technology

| Layer       | Technology                                            |
| ----------- | ----------------------------------------------------- |
| Language    | Swift 5.9+                                            |
| UI          | SwiftUI + AppKit menu bar                             |
| Memory      | Mach VM APIs (`host_statistics64`)                    |
| Storage     | Foundation volume capacity APIs                       |
| Discovery   | `Process` with explicit exec paths (no shell strings) |
| Clipboard   | `NSPasteboard` change count + atomic JSON store       |
| Network     | `getifaddrs` + IOKit interface classification        |
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
Pasteboard change → PasteboardManager → ClipperStore → ClipboardViewModel → SwiftUI Clipboard view
getifaddrs deltas → NetworkMonitor → NetworkViewModel → SwiftUI Network view
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
