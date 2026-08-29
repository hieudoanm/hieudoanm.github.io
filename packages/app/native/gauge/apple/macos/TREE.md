# Gauge

```
Gauge/
├── AGENTS.md
├── Docs/
│   ├── ARCHITECTURE.md
│   ├── CONTRIBUTING.md
│   ├── DOWNLOADS.md
│   ├── FEATURES.md
│   ├── PACKAGING.md
│   └── ROADMAP.md
├── LICENSE
├── Makefile
├── Package.swift
├── README.md
├── Resources/
│   ├── AppIcon.icns
│   ├── AppIcon.iconset/
│   │   ├── AppIcon-render.swift
│   │   └── AppIcon-source.svg
│   ├── Gauge.entitlements
│   └── Info.plist
├── Sources/
│   ├── App/
│   │   ├── GaugeApp.swift
│   │   ├── GaugeViewModel.swift
│   │   ├── LaunchAtLogin.swift
│   │   └── MenuBarIcon.swift
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── CPUStats.swift
│   │   │   ├── DiskStats.swift
│   │   │   ├── MemoryStats.swift
│   │   │   ├── MenuBarDisplay.swift
│   │   │   ├── SwapStats.swift
│   │   │   ├── SystemInfo.swift
│   │   │   └── UsageThreshold.swift
│   │   ├── ByteFormatter.swift
│   │   └── SettingsStore.swift
│   ├── Services/
│   │   ├── CPUMonitor.swift
│   │   ├── DiskMonitor.swift
│   │   ├── MemoryMonitor.swift
│   │   ├── MemoryPressureMonitor.swift
│   │   ├── MonitorError.swift
│   │   ├── SwapMonitor.swift
│   │   └── SystemInfoMonitor.swift
│   └── Views/
│       ├── CPUView.swift
│       ├── DetailsView.swift
│       ├── DiskView.swift
│       ├── MemoryView.swift
│       ├── MenuBarView.swift
│       ├── ResourceMeter.swift
│       ├── SettingsView.swift
│       ├── SmallView.swift
│       ├── SwapView.swift
│       ├── SystemInfoView.swift
│       ├── UnavailableView.swift
│       └── UsageThresholdColor.swift
└── Tests/
    └── Core/
        ├── Models/
        │   ├── CPUStatsTests.swift
        │   ├── DiskStatsTests.swift
        │   ├── MemoryStatsTests.swift
        │   ├── MenuBarDisplayTests.swift
        │   ├── SwapStatsTests.swift
        │   ├── SystemInfoTests.swift
        │   └── UsageThresholdTests.swift
        ├── ByteFormatterTests.swift
        └── SettingsStoreTests.swift
```