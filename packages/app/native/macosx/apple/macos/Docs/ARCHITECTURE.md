# Architecture

## Goals

- Monitor RAM and disk usage at a glance from the menu bar
- Compact native macOS menu-bar utility with popover details
- Separate Ports view for monitoring and managing local listening ports
- Clipboard history tab so nothing you copy is ever lost
- Live network throughput and per-interface traffic in a dedicated tab
- Public IP inspector with geolocation, ASN/org, and DNS lookups
- Running-apps list (Front tab) to bring any app's windows forward
- Workspaces tab to save and restore app layouts (launch apps, place windows)
- Low resource footprint (~0% idle CPU, <50 MB memory)
- Local-first, no backend
- Accurate, documented metrics

## Tech Stack

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Language       | Swift 5.9+                                          |
| UI             | SwiftUI                                             |
| Memory API     | Mach VM (`host_statistics64`)                       |
| Disk API       | Foundation `URLResourceValue`                       |
| Port discovery | `lsof` via `Process`                                |
| Clipboard      | `NSPasteboard` changeCount                          |
| Network        | `getifaddrs` + IOKit                                |
| IP / DNS       | `URLSession` public APIs                            |
| Front          | `NSWorkspace` + `CGWindowListCopyWindowInfo`        |
| Windows        | CoreGraphics (capture) + Accessibility AX (arrange) |
| Persistence    | Codable + JSON + FileManager                        |
| Build          | Swift Package Manager                               |
| Min macOS      | 13 Ventura                                          |

## Directory Structure

Code is organized by tab, with a `MacOSXCore` target holding everything
unit-testable (models + protocol-driven services) and the `MacOSX` target
holding system-facing services, ViewModels, and SwiftUI views.

```text
Sources/
├── App/                       ViewModels (one per tab)
│   ├── Clipboard/
│   │   └── ClipboardViewModel.swift
│   ├── Front/
│   │   └── AppsViewModel.swift
│   ├── IP/
│   │   └── IPViewModel.swift
│   ├── Memory/
│   │   └── MemoryViewModel.swift
│   ├── Network/
│   │   └── NetworkViewModel.swift
│   ├── Ports/
│   │   └── PortsViewModel.swift
│   ├── Workspaces/
│   │   └── WorkspacesViewModel.swift
│   └── Shared/
│       ├── MacOSXApp.swift
│       ├── LaunchAtLogin.swift
│       ├── MenuBarIcon.swift
│       └── MenuBarPanelPositioner.swift
├── Core/                      MacOSXCore target (public, unit-tested)
│   ├── Models/
│   │   ├── Clipboard/  ClipboardItem, ClipboardStore
│   │   ├── Front/      RunningAppInfo
│   │   ├── IP/         IPInfo, DNSResponse
│   │   ├── Memory/     MemoryStats, DiskStats, SwapStats, CPUStats, SystemInfo
│   │   ├── Network/    NetworkStats, NetworkSnapshots
│   │   ├── Ports/      PortInfo, NetworkEndpoint
│   │   ├── Workspaces/ Workspace, WorkspaceWindow, NormalizedRect, ScreenInfo
│   │   └── Shared/     MenuBarDisplay, UsageThreshold
│   ├── Services/
│   │   ├── Clipboard/  (store lives in Models)
│   │   ├── Front/      RunningAppProviding, RunningAppsDiscoveryService
│   │   ├── IP/         IPLookupServicing, IPInfoParsing
│   │   ├── Network/    NetworkInterfaceClassifying
│   │   ├── Ports/      PortDiscovering, LsofPortDiscoveryService, LsofParser,
│   │   │               ProcessTerminating, SignalProcessTerminator
│   │   └── Workspaces/ CoordinateConverter, WindowListing, WorkspaceStoring,
│   │                   WorkspaceStore, WorkspaceCapturing, WorkspaceRestoring,
│   │                   WorkspaceWindowBuilder
│   ├── ByteFormatter.swift    (shared)
│   └── SettingsStore.swift    (shared)
├── Services/                  System-facing services (MacOSX target)
│   ├── Clipboard/  ClipboardMonitor, PasteboardManager
│   ├── IP/         IPLookupService
│   ├── Memory/     MemoryMonitor, DiskMonitor, SwapMonitor, CPUMonitor,
│   │               SystemInfoMonitor, MemoryPressureMonitor
│   ├── Network/    NetworkMonitor, IOKitNetworkInterfaceClassifier
│   ├── Workspaces/ AccessibilityManager, CoreGraphicsWindowLister,
│   │               ScreenManager, ApplicationLauncher, WindowArranger,
│   │               WorkspaceCaptureService, WorkspaceRestoreService
│   └── Shared/     MonitorError
└── Views/
    ├── Clipboard/  ClipboardView
    ├── Front/      AppsView, AppsListView, AppRow
    ├── IP/         IPView
    ├── Memory/     SmallView, DetailsView, CPUView, DiskView, SwapView,
    │               SystemInfoView
    ├── Network/    NetworkView
    ├── Ports/      PortsView, PortListView, PortRow
    ├── Workspaces/ WorkspacesView, WorkspaceRow
    └── Shared/     MenuBarView, ResourceMeter, SettingsView, UnavailableView,
                    UsageThresholdColor
```

Tests mirror this layout under `Tests/Core/…`, one suite per tab, so parsing,
math, and store logic are verified independently of SwiftUI.

## Application Layers

```text
┌────────────────────────────────────────┐
│              Menu Bar                  │
│        CPU 39%   Disk 83%              │
├────────────────────────────────────────┤
│                Views                   │
│  MenuBarView | SmallView | DetailsView │
│  ClipboardView | AppsView | IPView     │
│  NetworkView | PortsView |             │
│  WorkspacesView | ResourceMeter |      │
│  SettingsView | UnavailableView        │
├────────────────────────────────────────┤
│             ViewModels                 │
│  MemoryViewModel | PortsViewModel      │
│  ClipboardViewModel | AppsViewModel    │
│  NetworkViewModel | IPViewModel |      │
│  WorkspacesViewModel                   │
├────────────────────────────────────────┤
│              Services                  │
│  MemoryMonitor | DiskMonitor |         │
│  SwapMonitor | CPUMonitor |            │
│  SystemInfoMonitor |                   │
│  LsofPortDiscoveryService |            │
│  ClipboardMonitor | PasteboardManager  │
│  NetworkMonitor | IPLookupService |    │
│  IOKitClassifier | RunningAppsDisc.    │
│  WorkspaceCapture/ RestoreService |    │
│  AccessibilityManager | CGWindowLister │
│  ScreenManager | ApplicationLauncher   │
│  WindowArranger                        │
├────────────────────────────────────────┤
│                 Core                   │
│  MemoryStats | DiskStats | SwapStats   │
│  CPUStats | SystemInfo | PortInfo      │
│  NetworkEndpoint | LsofParser |        │
│  SignalTerminator | ClipboardItem      │
│  ClipboardStore | NetworkStats |       │
│  IPInfo | DNSResponse | RunningAppInfo │
│  IPInfoParsing | IPNetworkError        │
│  SystemInfo | ByteFormatter |          │
│  Threshold | SettingsStore |           │
│  Workspace | WorkspaceWindow |         │
│  NormalizedRect | ScreenInfo |         │
│  WorkspaceStore | CoordinateConverter  │
└────────────────────────────────────────┘
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
`changeCount` every 0.5 s and appends new text to `ClipboardStore` when it
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
   ClipboardStore.add()  →  dedupe / cap / save
        ↓
      ClipboardView
```

The system pasteboard remains the source of truth — MacOSX only observes and
never pretends to own the clipboard. A user copy from history writes back via
`PasteboardManager.copyToClipboard`, which the monitor deduplicates on the next
tick. Monitoring can be paused in Settings, and `ClipboardStore.maxItems` caps
retained history to the configured limit.

### Front (Running Apps)

**Definition:** the regular, user-facing applications currently running, used
to bring any app's windows forward. `RunningAppsDiscoveryService` lists
`NSWorkspace.shared.runningApplications` (filtered to `.regular` activation
policy, excluding MacOSX itself) and enriches each entry with an on-screen
window count from `CGWindowListCopyWindowInfo`. Rows are sorted by localized
name; the search filters by name or bundle identifier. Acting is a direct
`NSRunningApplication.activate(options: .activateAllWindows,
.activateIgnoringOtherApps)` — no Accessibility permission needed.

```text
NSWorkspace.runningApplications + CGWindowListCopyWindowInfo
        ↓
    RunningAppsDiscoveryService
        ↓
       [RunningAppInfo]  (sorted, searchable)
        ↓
        AppsView  →  activate(.activateAllWindows)
```

The list refreshes every 2 seconds while the popover is open.

### Workspaces

**Definition:** named snapshots of the apps on screen and their window
positions, restored on demand — the button to hit after a clean boot or a
device switch. `WorkspaceCaptureService` lists layer-0 on-screen windows via
`CGWindowListCopyWindowInfo` (excluding MacOSX's own windows), resolves each
owner to a bundle identifier with `NSRunningApplication`, and converts every
window CGRect into a `NormalizedRect` plus a `screenID` relative to the
visible frame of the display it occupies. `WorkspaceStore` persists the list
atomically as JSON at `~/Library/Application Support/Workspaces/workspaces.json`.

```text
CGWindowListCopyWindowInfo(.optionOnScreenOnly)
        ↓  layer 0, self excluded, bundle id resolved
  [CapturedWindow] (pid, bundleID, title, bounds)
        ↓  WorkspaceWindowBuilder.normalize (per ScreenInfo visible frame)
  [WorkspaceWindow] (bundleID, title?, screenID?, NormalizedRect)
        ↓
      WorkspaceStore.save → workspaces.json
```

Restoring launches missing apps in parallel (one `Task` per bundle identifier,
waiting up to 10 s for a chosen PID) and arranges each app's windows through
the Accessibility (AX) APIs — `AXUIElementCopyAttributeValue(kAXWindows…)` to
find windows, `kAXPosition` / `kAXSize` to place them. Windows are matched by
saved title when present, otherwise the first window is used. Windows restore
to the **saved display ID** with a fallback to the primary display, so a
layout captured on a multi-monitor setup is placed back where it was.

```text
restore(workspace)
   for each bundleID (async group):
       running? ─no→ launch (NSRunningApplication) → wait for PID
                                    ↓
                       AX window list (kAXWindows)
                                    ↓
              place via kAXPosition / kAXSize (WindowArranger)
```

Accessibility is the only permission MacOSX can request, and only window
arrangement needs it. The Workspaces tab shows a **Grant** banner when
`AXIsProcessTrusted()` is false and reports a summary after each restore
(windows placed vs. failed, apps that could not be launched).

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
`changeCount` comparison. The Front (running apps) list refreshes every 2
seconds while visible. Workspaces data is read on demand from disk.

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

- `MemoryViewModel` — observable coordinator between Views and services;
  owns the system monitor pipeline (memory, disk, swap, CPU, system, pressure)
- `PortsViewModel` — observable coordinator for port discovery and termination
- `ClipboardViewModel` — observable coordinator for clipboard history, owns the
  `ClipboardStore` and monitor, persists monitor/max-history preferences
- `AppsViewModel` — observable coordinator for the running-apps list (Front
  tab), refreshes every 2 s while visible
- `IPViewModel` — observable coordinator for IP/DNS lookups, classifies
  connectivity failures into an explicit Offline state
- `NetworkViewModel` — observable coordinator for throughput and session totals
- `WorkspacesViewModel` — observable coordinator for saved workspaces
  (capture, list, restore, delete); owns the `WorkspaceStore`, capture service,
  restore service, and accessibility permission state
- `SettingsStore` — persists user preferences (refresh interval, shared by the
  system and ports view models)
- Models are immutable value types with computed ratio/percentage

## Styling

- Native SwiftUI with SF Symbols for the menu bar
- `.monospacedDigit()` for stable menu-bar width
- SF Symbols and system colors throughout
- `MenuBarExtra` popover as the primary UI surface
