# Architecture

## Goals

- Monitor RAM and disk usage at a glance from the menu bar
- Compact native macOS menu-bar utility with popover details
- Separate Ports view for monitoring and managing local listening ports
- Clipboard history tab so nothing you copy is ever lost
- Live network throughput and per-interface traffic in a dedicated tab
- Public IP inspector with geolocation, ASN/org, and DNS lookups
- Low resource footprint (~0% idle CPU, <50 MB memory)
- No special permissions, local-first, no backend
- Accurate, documented metrics

## Tech Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Language       | Swift 5.9+                    |
| UI             | SwiftUI                       |
| Memory API     | Mach VM (`host_statistics64`) |
| Disk API       | Foundation `URLResourceValue` |
| Port discovery | `lsof` via `Process`          |
| Clipboard      | `NSPasteboard` changeCount    |
| Network        | `getifaddrs` + IOKit          |
| IP / DNS       | `URLSession` public APIs      |
| Persistence    | Codable + JSON + FileManager  |
| Build          | Swift Package Manager         |
| Min macOS      | 13 Ventura                    |

## Directory Structure

```text
Sources/
├── App/
│   ├── GaugeApp.swift
│   ├── GaugeViewModel.swift
│   ├── PortsViewModel.swift
│   ├── ClipboardViewModel.swift
│   ├── NetworkViewModel.swift
│   ├── IPViewModel.swift
│   ├── LaunchAtLogin.swift
│   └── MenuBarIcon.swift
├── Core/
│   ├── Models/
│   │   ├── MemoryStats.swift
│   │   ├── DiskStats.swift
│   │   ├── SwapStats.swift
│   │   ├── CPUStats.swift
│   │   ├── SystemInfo.swift
│   │   ├── UsageThreshold.swift
│   │   ├── NetworkEndpoint.swift
│   │   ├── PortInfo.swift
│   │   ├── ClipperItem.swift
│   │   ├── ClipperStore.swift
│   │   ├── NetworkStats.swift
│   │   ├── NetworkSnapshots.swift
│   │   ├── IPInfo.swift
│   │   └── DNSResponse.swift
│   ├── Services/
│   │   ├── PortDiscovering.swift
│   │   ├── LsofPortDiscoveryService.swift
│   │   ├── LsofParser.swift
│   │   ├── ProcessTerminating.swift
│   │   ├── SignalProcessTerminator.swift
│   │   ├── NetworkInterfaceClassifying.swift
│   │   ├── IPLookupServicing.swift
│   │   └── IPInfoParsing.swift
│   ├── ByteFormatter.swift
│   └── SettingsStore.swift
├── Services/
│   ├── MemoryMonitor.swift
│   ├── DiskMonitor.swift
│   ├── SwapMonitor.swift
│   ├── CPUMonitor.swift
│   ├── SystemInfoMonitor.swift
│   ├── MonitorError.swift
│   ├── ClipboardMonitor.swift
│   ├── PasteboardManager.swift
│   ├── NetworkMonitor.swift
│   ├── IOKitNetworkInterfaceClassifier.swift
│   └── IPLookupService.swift
└── Views/
    ├── MenuBarView.swift
    ├── SmallView.swift
    ├── DetailsView.swift
    ├── ClipboardView.swift
    ├── IPView.swift
    ├── NetworkView.swift
    ├── PortsView.swift
    ├── PortListView.swift
    ├── PortRow.swift
    ├── ResourceMeter.swift
    ├── MemoryView.swift
    ├── DiskView.swift
    ├── CPUView.swift
    ├── SwapView.swift
    ├── SystemInfoView.swift
    ├── UnavailableView.swift
    ├── UsageThresholdColor.swift
    └── SettingsView.swift
```

## Application Layers

```text
┌──────────────────────────────────┐
│           Menu Bar               │
│     CPU 39%   Disk 83%           │
├──────────────────────────────────┤
│            Views                 │
│  MenuBarView | SmallView         │
│  DetailsView | ResourceMeter     │
│  ClipboardView | NetworkView     │
│  PortsView | PortListView        │
│  IPView | PortRow | SettingsView │
├──────────────────────────────────┤
│          ViewModels              │
│  GaugeViewModel | PortsViewModel │
│  ClipboardViewModel |            │
│  NetworkViewModel | IPViewModel  │
├──────────────────────────────────┤
│           Services               │
│  MemoryMonitor | DiskMonitor     │
│  SwapMonitor | CPUMonitor        │
│  SystemInfoMonitor |             │
│  LsofPortDiscoveryService        │
│  ClipboardMonitor |              │
│  PasteboardManager               │
│  NetworkMonitor |                │
│  IPLookupService | IOKitClassifier│
├──────────────────────────────────┤
│             Core                 │
│  MemoryStats | DiskStats         │
│  SwapStats | CPUStats            │
│  PortInfo | NetworkEndpoint      │
│  LsofParser | SignalTerminator   │
│  ClipperItem | ClipperStore      │
│  NetworkStats | Snapshots        │
│  IPInfo | DNSResponse            │
│  IPInfoParsing | IPNetworkError  │
│  SystemInfo | ByteFormatter      │
│  Threshold | SettingsStore       │
└──────────────────────────────────┘
```

## Monitoring

### Memory

The common AppKit/SwiftUI tick-based refresh pattern, backed by Mach VM statistics.

**Definition of "used":** `active + wired + compressed` pages. Inactive and
purgeable pages are excluded because the system can reclaim them without
swapping. This avoids the misleading "nearly full" number that `total − free`
produces while still keeping the metric stable and well-defined.

```text
host_statistics64(HOST_VM_INFO64)
        ↓
active + wired + compressed  (pages × page size)
        ↓
        MemoryStats
```

The active / wired / compressed components are kept on the model and rendered
as a breakdown line in the details view. The inactive / cached (`external_page_count`)
/ free components are kept as a second line, giving a fuller picture of how much
memory the system can reclaim.

### Swap

**Definition:** bytes currently swapped out vs. total swap configured, from the
Mach `vm.swapusage` sysctl.

```text
sysctlbyname("vm.swapusage")
        ↓
        SwapStats
```

### CPU

**Definition of usage:** aggregate processor load as the delta of cumulative
per-CPU tick counters between two reads. The first sample reflects load since
launch.

**Load average:** `getloadavg(3)` provides the 1/5/15-minute running averages of
runnable threads, rendered as `Load 2.1 · 1.8 · 1.5`.

```text
host_processor_info(PROCESSOR_CPU_LOAD_INFO)         getloadavg()
        ↓                                                ↓
(ticks_at_now − ticks_at_previous) / total         loadAverage1/5/15
        ↓                                                ↓
                        CPUStats
```

### System

**Definition:** static hardware identity and boot age, read once per refresh via
sysctl (cost is negligible).

```text
hw.model | hw.physicalcpu | hw.logicalcpu | kern.boottime
        ↓                       ↓               ↓
      chip                     cores          uptime
        ↓                       ↓               ↓
                      SystemInfo
```

Rendered as a single footer line in the details view:
`Apple M2 · 8 cores · Up 3d 15h`.

### Disk

**Definition of "used":** `total capacity − available for important usage`.
Apple's "important usage" value excludes purgeable files the system can
reclaim, which matches perceived consumed storage. Free and purgeable amounts
are exposed on the model for the details view.

```text
URLResourceKey.volumeTotalCapacityKey
URLResourceKey.volumeAvailableCapacityForImportantUsageKey
URLResourceKey.volumeAvailableCapacityForOpportunisticUsageKey
        ↓
total − available
        ↓
        DiskStats
```

### Ports

**Definition:** processes listening on local TCP ports and bound UDP sockets.
`LsofPortDiscoveryService` runs `/usr/sbin/lsof` with explicit arguments
(`-nP -iTCP -sTCP:LISTEN` and `-nP -iUDP`) via `Process` — never through a
shell. `LsofParser` defensively parses the tabular output into `PortInfo`
values, skipping headers, malformed rows, and connected UDP sockets, and
deduplicating per (pid, protocol, port, address).

```text
lsof -nP -iTCP -sTCP:LISTEN     lsof -nP -iUDP
        ↓                             ↓
        LsofParser → LsofParser
                ↓
            [PortInfo]
                ↓
          PortsViewModel
                ↓
             PortsView
```

Termination is sealed behind `ProcessTerminating`: `SignalProcessTerminator`
sends SIGTERM for a graceful kill and SIGKILL for a force kill, always
refusing to signal invalid PIDs or the app itself. Discovery and termination
are protocol-based so unit tests can substitute mocks.

### Clipboard

**Definition:** a searchable, local-first history of everything copied to the
system clipboard (migrated from the standalone Clipper app). `PasteboardManager`
is the single access point to `NSPasteboard.general`; `ClipboardMonitor` polls
`changeCount` every 0.5 s and appends new text to `ClipperStore` when it
changes. The store deduplicates repeated copies (bump `copiedCount`, move to
front), supports pin/delete/clear-unpinned, searches case-insensitively, and
persists atomically to `~/Library/Application Support/Clipper/clipboard.json`.

```text
NSPasteboard.general.changeCount
        ↓ (poll every 0.5 s)
     changed?  ──no──→  wait for next tick
        ↓ yes
   getLatestContent()
        ↓
   ClipperStore.add()  →  dedupe / cap / save
        ↓
     ClipboardView
```

The system pasteboard remains the source of truth — Gauge only observes and
never pretends to own the clipboard. A user copy from history writes back via
`PasteboardManager.copyToClipboard`, which the monitor deduplicates on the next
tick. Monitoring can be paused in Settings, and `ClipperStore.maxItems` caps
retained history to the configured limit.

### Network

**Definition:** real-time download/upload throughput and per-interface traffic.
`NetworkMonitor` reads the kernel's cumulative per-interface byte counters via
`getifaddrs` — the same counters `netstat` reports — and turns the delta between
two consecutive reads into a bytes-per-second rate. Counters are 32-bit, so the
model's `delta(from:to:)` handles their wrap; totals are accumulated from deltas
instead of reading raw cumulative values, keeping them accurate and bounded to
the current app session (loopback traffic is excluded).

`NetworkSnapshots.aggregate` collapses the getifaddrs per-address entries into
one sample per interface (OR-ing up/address flags, taking the highest counter).
Wi-Fi vs Ethernet is resolved by `IOKitNetworkInterfaceClassifier`, which walks
the IOKit parent chain of each BSD interface looking for `IO80211Interface`
conformance or `80211`/`WLAN`/`AirPort`/`Ethernet` class markers. Interface
status is derived from link state and whether the interface holds an IP:
connected (up + address), link up, or down.

```text
getifaddrs()
        ↓
[NetworkAddressSnapshot] (one entry per address family)
        ↓
NetworkSnapshots.aggregate  →  one sample per interface
        ↓
NetworkMonitor  (delta / elapsed since previous tick)
        ↓
       NetworkStats
        ↓
    NetworkViewModel  (accumulates session totals)
        ↓
        NetworkView
```

### IP

**Definition:** the device's current public IP plus geolocation, ASN, and org
details, resolved through public HTTP APIs — never shell commands or local
network scanning. `IPLookupService` gets the IP from `api.ipify.org`, asks
`ipinfo.io` for enrichment, and falls back to `ipapi.co` if that fails (both
may rate-limit, so the fallback keeps the tab working). DNS A-record lookups
hit Cloudflare's DNS-over-HTTPS endpoint (`application/dns-json`) with a
timeout. Responses are normalised into `IPInfo` / `DNSResponse` by pure
`IPInfoParsing` functions in Core, so decoding and the VPN/shared-hosting
heuristic (`detectVPN`) are unit-tested. Wire-format JSON is shown verbatim via
collapsible sections.

```text
api.ipify.org  (current IP)
        ↓
ipinfo.io ──fail──→ ipapi.co
        ↓
   IPInfoParsing (normalise + detectVPN + offline classification)
        ↓
       IPInfo | DNSResponse
        ↓
      IPViewModel
        ↓
        IPView
```

`IPViewModel` classifies `URLError`s into an explicit **Offline** state
(`notConnectedToInternet`, `cannotConnectToHost`, `cannotFindHost`,
`networkConnectionLost`, `timedOut`, `dnsLookupFailed`) versus a generic error
message, satisfying "offline shows offline, errors show the error". The IP tab
does not auto-refresh — data is fetched when the tab appears and on Refresh.

### Refresh

A single coordinated 1-second timer drives all five system monitors. When the
popover is closed the menu-bar percentages still refresh in place (they are
cheap host/FS reads); no independent per-metric timers exist. The Ports view
runs its own lightweight discovery loop on launch, honoring the same
`SettingsStore.refreshInterval`; the Network view behaves the same way, so
throughput rates always divide by the configured interval. The Clipboard
monitor is independent: a 0.5-second pasteboard poll whose only cost is a
`changeCount` comparison.

## Formatting

`ByteFormatter` is the single source of truth:

- Binary units B / KB / MB / GB / TB
- `< 100`: one decimal place (`12.4 GB`)
- `>= 100`: integer (`412 GB`)
- Same rules for memory and disk

## Thresholds

```text
0–69%    Normal   (secondary color)
70–89%   Elevated (orange)
90–100%  High     (red)
```

Semantic system colors only — readable in Light and Dark Mode.

## State Management

- `GaugeViewModel` — observable coordinator between Views and Services
- `PortsViewModel` — observable coordinator for port discovery and termination
- `ClipboardViewModel` — observable coordinator for clipboard history, owns the
  `ClipperStore` and monitor, persists monitor/max-history preferences
- `IPViewModel` — observable coordinator for IP/DNS lookups, classifies
  connectivity failures into an explicit Offline state
- `SettingsStore` — persists user preferences (refresh interval, shared by the system and ports view models)
- Models are immutable value types with computed ratio/percentage

## Styling

- Native SwiftUI with SF Symbols for the menu bar
- `.monospacedDigit()` for stable menu-bar width
- SF Symbols and system colors throughout
- `MenuBarExtra` popover as the primary UI surface
