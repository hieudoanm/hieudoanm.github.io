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
│   │   │   ├── DiskStats.swift
│   │   │   ├── MemoryStats.swift
│   │   │   └── UsageThreshold.swift
│   │   ├── ByteFormatter.swift
│   │   └── SettingsStore.swift
│   ├── Services/
│   │   ├── DiskMonitor.swift
│   │   ├── MemoryMonitor.swift
│   │   └── MonitorError.swift
│   └── Views/
│       ├── DiskView.swift
│       ├── MemoryView.swift
│       ├── MenuBarView.swift
│       ├── ResourceMeter.swift
│       ├── SettingsView.swift
│       └── UnavailableView.swift
└── Tests/
    └── Core/
        ├── Models/
        │   ├── DiskStatsTests.swift
        │   ├── MemoryStatsTests.swift
        │   └── UsageThresholdTests.swift
        ├── ByteFormatterTests.swift
        └── SettingsStoreTests.swift
```