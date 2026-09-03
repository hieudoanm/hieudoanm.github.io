# TREE

```text
├── Docs/
│   ├── [ARCHITECTURE.md](./Docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./Docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./Docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./Docs/PACKAGING.md)
│   └── [ROADMAP.md](./Docs/ROADMAP.md)
├── Resources/
│   ├── AppIcon.iconset/
│   │   ├── [AppIcon-render.swift](./Resources/AppIcon.iconset/AppIcon-render.swift)
│   │   └── [AppIcon-source.svg](./Resources/AppIcon.iconset/AppIcon-source.svg)
│   ├── [AppIcon.icns](./Resources/AppIcon.icns)
│   ├── [Gauge.entitlements](./Resources/Gauge.entitlements)
│   └── [Info.plist](./Resources/Info.plist)
├── Sources/
│   ├── App/
│   │   ├── [GaugeApp.swift](./Sources/App/GaugeApp.swift)
│   │   ├── [GaugeViewModel.swift](./Sources/App/GaugeViewModel.swift)
│   │   ├── [LaunchAtLogin.swift](./Sources/App/LaunchAtLogin.swift)
│   │   └── [MenuBarIcon.swift](./Sources/App/MenuBarIcon.swift)
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── [CPUStats.swift](./Sources/Core/Models/CPUStats.swift)
│   │   │   ├── [DiskStats.swift](./Sources/Core/Models/DiskStats.swift)
│   │   │   ├── [MemoryStats.swift](./Sources/Core/Models/MemoryStats.swift)
│   │   │   ├── [MenuBarDisplay.swift](./Sources/Core/Models/MenuBarDisplay.swift)
│   │   │   ├── [SwapStats.swift](./Sources/Core/Models/SwapStats.swift)
│   │   │   ├── [SystemInfo.swift](./Sources/Core/Models/SystemInfo.swift)
│   │   │   └── [UsageThreshold.swift](./Sources/Core/Models/UsageThreshold.swift)
│   │   ├── [ByteFormatter.swift](./Sources/Core/ByteFormatter.swift)
│   │   └── [SettingsStore.swift](./Sources/Core/SettingsStore.swift)
│   ├── Services/
│   │   ├── [CPUMonitor.swift](./Sources/Services/CPUMonitor.swift)
│   │   ├── [DiskMonitor.swift](./Sources/Services/DiskMonitor.swift)
│   │   ├── [MemoryMonitor.swift](./Sources/Services/MemoryMonitor.swift)
│   │   ├── [MemoryPressureMonitor.swift](./Sources/Services/MemoryPressureMonitor.swift)
│   │   ├── [MonitorError.swift](./Sources/Services/MonitorError.swift)
│   │   ├── [SwapMonitor.swift](./Sources/Services/SwapMonitor.swift)
│   │   └── [SystemInfoMonitor.swift](./Sources/Services/SystemInfoMonitor.swift)
│   └── Views/
│       ├── [CPUView.swift](./Sources/Views/CPUView.swift)
│       ├── [DetailsView.swift](./Sources/Views/DetailsView.swift)
│       ├── [DiskView.swift](./Sources/Views/DiskView.swift)
│       ├── [MemoryView.swift](./Sources/Views/MemoryView.swift)
│       ├── [MenuBarView.swift](./Sources/Views/MenuBarView.swift)
│       ├── [ResourceMeter.swift](./Sources/Views/ResourceMeter.swift)
│       ├── [SettingsView.swift](./Sources/Views/SettingsView.swift)
│       ├── [SmallView.swift](./Sources/Views/SmallView.swift)
│       ├── [SwapView.swift](./Sources/Views/SwapView.swift)
│       ├── [SystemInfoView.swift](./Sources/Views/SystemInfoView.swift)
│       ├── [UnavailableView.swift](./Sources/Views/UnavailableView.swift)
│       └── [UsageThresholdColor.swift](./Sources/Views/UsageThresholdColor.swift)
├── Tests/
│   └── Core/
│       ├── Models/
│       │   ├── [CPUStatsTests.swift](./Tests/Core/Models/CPUStatsTests.swift)
│       │   ├── [DiskStatsTests.swift](./Tests/Core/Models/DiskStatsTests.swift)
│       │   ├── [MemoryStatsTests.swift](./Tests/Core/Models/MemoryStatsTests.swift)
│       │   ├── [MenuBarDisplayTests.swift](./Tests/Core/Models/MenuBarDisplayTests.swift)
│       │   ├── [SwapStatsTests.swift](./Tests/Core/Models/SwapStatsTests.swift)
│       │   ├── [SystemInfoTests.swift](./Tests/Core/Models/SystemInfoTests.swift)
│       │   └── [UsageThresholdTests.swift](./Tests/Core/Models/UsageThresholdTests.swift)
│       ├── [ByteFormatterTests.swift](./Tests/Core/ByteFormatterTests.swift)
│       └── [SettingsStoreTests.swift](./Tests/Core/SettingsStoreTests.swift)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [Package.swift](./Package.swift)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

12 directories, 57 files
