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
│   ├── Gauge.entitlements
│   └── Info.plist
├── Sources/
│   ├── App/
│   │   ├── GaugeApp.swift
│   │   ├── GaugeViewModel.swift
│   │   └── MenuBarIcon.swift
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── CPUStats.swift
│   │   │   ├── DiskStats.swift
│   │   │   ├── MemoryStats.swift
│   │   │   ├── SwapStats.swift
│   │   │   └── UsageThreshold.swift
│   │   ├── ByteFormatter.swift
│   │   └── SettingsStore.swift
│   ├── Services/
│   │   ├── CPUMonitor.swift
│   │   ├── DiskMonitor.swift
│   │   ├── MemoryMonitor.swift
│   │   ├── MonitorError.swift
│   │   └── SwapMonitor.swift
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
│       ├── UnavailableView.swift
│       └── UsageThresholdColor.swift
└── Tests/
    └── Core/
        ├── Models/
        │   ├── CPUStatsTests.swift
        │   ├── DiskStatsTests.swift
        │   ├── MemoryStatsTests.swift
        │   ├── SwapStatsTests.swift
        │   └── UsageThresholdTests.swift
        ├── ByteFormatterTests.swift
        └── SettingsStoreTests.swift
```