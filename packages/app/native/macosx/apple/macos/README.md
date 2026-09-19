# MacOSX

Lightweight menu-bar utility for monitoring RAM and disk storage usage at a glance, with dedicated views for live network throughput, managing processes listening on local ports, a clipboard history that never loses a copy, a public IP inspector, and full battery monitoring.

## Overview

MacOSX is a small native macOS menu-bar utility that answers four questions: _how much memory and storage am I using right now?_, _what is using this port?_, _where did that thing I copied go?_, and _what is my public IP?_ A compact menu-bar indicator shows current usage, and clicking it opens a popover with **Battery**, **Clipboard**, **Front**, **IP**, **Memory** (default), **Network**, **Ports** and **Workspaces** tabs — from searchable copy history and the current public IP to detailed memory, storage, CPU, swap and system info, live download/upload throughput, battery health, and managing local listeners.

## Features

- **RAM usage** — used / total and percentage, via native Mach VM APIs (`host_statistics64`).
- **Storage usage** — used / total and percentage, via native Foundation filesystem APIs for the boot volume.
- **Menu bar** — compact indicators (e.g. `CPU 39%  Disk 83%`) readable without opening the popover.
- **Popover** — reusable `ResourceMeter` progress bars for memory and storage.
- **Port monitoring** — a dedicated Ports tab lists processes listening on local TCP/UDP ports via `lsof`, with search, copy-paste actions, and graceful (SIGTERM) or force (SIGKILL) termination.
- **Clipboard history** — a dedicated Clipboard tab captures everything you copy, with search, re-copy, pin, delete, and clear-unpinned; stored locally at `Application Support/Clipper/clipboard.json`.
- **Network monitoring** — a dedicated Network tab shows live download/upload rates, session totals, and per-interface traffic with Wi-Fi/Ethernet classification via `getifaddrs` + IOKit.
- **IP inspector** — a dedicated IP tab resolves the current public IP via `api.ipify.org`, enriches it with `ipinfo.io` (falling back to `ipapi.co`), and performs A-record lookups through Cloudflare DNS-over-HTTPS; shows offline and error states distinctly.
- **Battery monitoring** — a dedicated Battery tab shows charge level with a progress bar, power source and charging state, time remaining/full, capacity, cycle count, temperature, health condition, and adapter wattage via IOKit power-source APIs.
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
| Battery     | IOKit power sources + smart battery registry         |
| IP / DNS    | `URLSession` + public APIs (ipify, ipinfo, Cloudflare) |
| Testability | `PortDiscovering` / `ProcessTerminating` protocols    |
| Build       | Swift Package Manager                                 |
| Min macOS   | 13 Ventura                                            |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble MacOSX.app bundle
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```txt
SystemMonitor → MemoryMonitor / DiskMonitor → observable state → SwiftUI menu bar / popover
PortDiscovery → Service → ViewModel → SwiftUI Ports view
Pasteboard change → PasteboardManager → ClipperStore → ClipboardViewModel → SwiftUI Clipboard view
getifaddrs deltas → NetworkMonitor → NetworkViewModel → SwiftUI Network view
IPLookupService → IPViewModel → SwiftUI IP view (ipify → ipinfo → ipapi, Cloudflare DNS)
IOKit power sources → BatteryMonitor → BatteryViewModel → SwiftUI Battery view
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
