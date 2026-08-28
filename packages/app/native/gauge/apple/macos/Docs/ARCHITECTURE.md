# Architecture

## Goals

- Monitor RAM and disk usage at a glance from the menu bar
- Compact native macOS menu-bar utility with popover details
- Low resource footprint (~0% idle CPU, <50 MB memory)
- No special permissions, local-first, no backend
- Accurate, documented metrics

## Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Language       | Swift 5.9+                     |
| UI             | SwiftUI                        |
| Memory API     | Mach VM (`host_statistics64`)  |
| Disk API       | Foundation `URLResourceValue`  |
| Persistence    | Codable + JSON + FileManager   |
| Build          | Swift Package Manager          |
| Min macOS      | 13 Ventura                     |

## Directory Structure

```text
Sources/
├── App/
│   ├── GaugeApp.swift
│   ├── GaugeViewModel.swift
│   └── MenuBarIcon.swift
├── Core/
│   ├── Models/
│   │   ├── MemoryStats.swift
│   │   ├── DiskStats.swift
│   │   └── UsageThreshold.swift
│   ├── ByteFormatter.swift
│   └── SettingsStore.swift
├── Services/
│   ├── MemoryMonitor.swift
│   ├── DiskMonitor.swift
│   └── MonitorError.swift
└── Views/
    ├── MenuBarView.swift
    ├── ResourceMeter.swift
    ├── MemoryView.swift
    ├── DiskView.swift
    ├── UnavailableView.swift
    └── SettingsView.swift
```

## Application Layers

```text
┌──────────────────────────────────┐
│           Menu Bar               │
│      🧠 39%   💾 83%             │
├──────────────────────────────────┤
│            Views                 │
│  MenuBarView | ResourceMeter     │
│  MemoryView | DiskView           │
│  SettingsView                    │
├──────────────────────────────────┤
│          ViewModel               │
│         GaugeViewModel           │
├──────────────────────────────────┤
│           Services               │
│  MemoryMonitor | DiskMonitor     │
├──────────────────────────────────┤
│             Core                 │
│  MemoryStats | DiskStats         │
│  ByteFormatter | Threshold       │
│  SettingsStore                   │
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

### Disk

**Definition of "used":** `total capacity − available for important usage`.
Apple's "important usage" value excludes purgeable files the system can
reclaim, which matches perceived consumed storage.

```text
URLResourceKey.volumeTotalCapacityKey
URLResourceKey.volumeAvailableCapacityForImportantUsageKey
        ↓
total − available
        ↓
        DiskStats
```

### Refresh

A single coordinated 1-second timer drives both monitors. When the popover is
closed the menu-bar percentages still refresh in place (they are cheap
host/FS reads); no independent per-metric timers exist.

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
- `SettingsStore` — persists user preferences (refresh interval)
- Models are immutable value types with computed ratio/percentage

## Styling

- Native SwiftUI with unicode glyphs for the menu bar (`🧠` / `💾`)
- `.monospacedDigit()` for stable menu-bar width
- SF Symbols and system colors throughout
- `MenuBarExtra` popover as the primary UI surface