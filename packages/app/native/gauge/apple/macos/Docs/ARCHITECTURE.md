# Architecture

## Goals

- Monitor RAM and disk usage at a glance from the menu bar
- Compact native macOS menu-bar utility with popover details
- Separate Ports view for monitoring and managing local listening ports
- Clipboard history tab so nothing you copy is ever lost
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
│   │   └── ClipperStore.swift
│   ├── Services/
│   │   ├── PortDiscovering.swift
│   │   ├── LsofPortDiscoveryService.swift
│   │   ├── LsofParser.swift
│   │   ├── ProcessTerminating.swift
│   │   └── SignalProcessTerminator.swift
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
│   └── PasteboardManager.swift
└── Views/
    ├── MenuBarView.swift
    ├── SmallView.swift
    ├── DetailsView.swift
    ├── ClipboardView.swift
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
│  ClipboardView | PortsView       │
│  PortListView | PortRow          │
│  SettingsView                    │
├──────────────────────────────────┤
│          ViewModels              │
│  GaugeViewModel | PortsViewModel │
│  ClipboardViewModel              │
├──────────────────────────────────┤
│           Services               │
│  MemoryMonitor | DiskMonitor     │
│  SwapMonitor | CPUMonitor        │
│  SystemInfoMonitor |             │
│  LsofPortDiscoveryService        │
│  ClipboardMonitor |              │
│  PasteboardManager               │
├──────────────────────────────────┤
│             Core                 │
│  MemoryStats | DiskStats         │
│  SwapStats | CPUStats            │
│  PortInfo | NetworkEndpoint      │
│  LsofParser | SignalTerminator   │
│  ClipperItem | ClipperStore      │
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

### Refresh

A single coordinated 1-second timer drives all five system monitors. When the
popover is closed the menu-bar percentages still refresh in place (they are
cheap host/FS reads); no independent per-metric timers exist. The Ports view
runs its own lightweight discovery loop on launch, honoring the same
`SettingsStore.refreshInterval`. The Clipboard monitor is independent: a
0.5-second pasteboard poll whose only cost is a `changeCount` comparison.

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
- `SettingsStore` — persists user preferences (refresh interval, shared by the system and ports view models)
- Models are immutable value types with computed ratio/percentage

## Styling

- Native SwiftUI with SF Symbols for the menu bar
- `.monospacedDigit()` for stable menu-bar width
- SF Symbols and system colors throughout
- `MenuBarExtra` popover as the primary UI surface
