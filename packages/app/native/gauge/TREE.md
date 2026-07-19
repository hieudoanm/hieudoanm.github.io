# TREE

```text
├── android/
│   └── [README.md](./android/README.md)
├── apple/
│   ├── macos/
│   │   ├── Docs/
│   │   │   ├── [ARCHITECTURE.md](./apple/macos/Docs/ARCHITECTURE.md)
│   │   │   ├── [CONTRIBUTING.md](./apple/macos/Docs/CONTRIBUTING.md)
│   │   │   ├── [DOWNLOADS.md](./apple/macos/Docs/DOWNLOADS.md)
│   │   │   ├── [PACKAGING.md](./apple/macos/Docs/PACKAGING.md)
│   │   │   └── [ROADMAP.md](./apple/macos/Docs/ROADMAP.md)
│   │   ├── Resources/
│   │   │   ├── AppIcon.iconset/
│   │   │   │   ├── [AppIcon-render.swift](./apple/macos/Resources/AppIcon.iconset/AppIcon-render.swift)
│   │   │   │   └── [AppIcon-source.svg](./apple/macos/Resources/AppIcon.iconset/AppIcon-source.svg)
│   │   │   ├── [AppIcon.icns](./apple/macos/Resources/AppIcon.icns)
│   │   │   ├── [Gauge.entitlements](./apple/macos/Resources/Gauge.entitlements)
│   │   │   └── [Info.plist](./apple/macos/Resources/Info.plist)
│   │   ├── Sources/
│   │   │   ├── App/
│   │   │   │   ├── [GaugeApp.swift](./apple/macos/Sources/App/GaugeApp.swift)
│   │   │   │   ├── [GaugeViewModel.swift](./apple/macos/Sources/App/GaugeViewModel.swift)
│   │   │   │   ├── [LaunchAtLogin.swift](./apple/macos/Sources/App/LaunchAtLogin.swift)
│   │   │   │   └── [MenuBarIcon.swift](./apple/macos/Sources/App/MenuBarIcon.swift)
│   │   │   ├── Core/
│   │   │   │   ├── Models/
│   │   │   │   │   ├── [CPUStats.swift](./apple/macos/Sources/Core/Models/CPUStats.swift)
│   │   │   │   │   ├── [DiskStats.swift](./apple/macos/Sources/Core/Models/DiskStats.swift)
│   │   │   │   │   ├── [MemoryStats.swift](./apple/macos/Sources/Core/Models/MemoryStats.swift)
│   │   │   │   │   ├── [MenuBarDisplay.swift](./apple/macos/Sources/Core/Models/MenuBarDisplay.swift)
│   │   │   │   │   ├── [SwapStats.swift](./apple/macos/Sources/Core/Models/SwapStats.swift)
│   │   │   │   │   ├── [SystemInfo.swift](./apple/macos/Sources/Core/Models/SystemInfo.swift)
│   │   │   │   │   └── [UsageThreshold.swift](./apple/macos/Sources/Core/Models/UsageThreshold.swift)
│   │   │   │   ├── [ByteFormatter.swift](./apple/macos/Sources/Core/ByteFormatter.swift)
│   │   │   │   └── [SettingsStore.swift](./apple/macos/Sources/Core/SettingsStore.swift)
│   │   │   ├── Services/
│   │   │   │   ├── [CPUMonitor.swift](./apple/macos/Sources/Services/CPUMonitor.swift)
│   │   │   │   ├── [DiskMonitor.swift](./apple/macos/Sources/Services/DiskMonitor.swift)
│   │   │   │   ├── [MemoryMonitor.swift](./apple/macos/Sources/Services/MemoryMonitor.swift)
│   │   │   │   ├── [MemoryPressureMonitor.swift](./apple/macos/Sources/Services/MemoryPressureMonitor.swift)
│   │   │   │   ├── [MonitorError.swift](./apple/macos/Sources/Services/MonitorError.swift)
│   │   │   │   ├── [SwapMonitor.swift](./apple/macos/Sources/Services/SwapMonitor.swift)
│   │   │   │   └── [SystemInfoMonitor.swift](./apple/macos/Sources/Services/SystemInfoMonitor.swift)
│   │   │   └── Views/
│   │   │       ├── [CPUView.swift](./apple/macos/Sources/Views/CPUView.swift)
│   │   │       ├── [DetailsView.swift](./apple/macos/Sources/Views/DetailsView.swift)
│   │   │       ├── [DiskView.swift](./apple/macos/Sources/Views/DiskView.swift)
│   │   │       ├── [MemoryView.swift](./apple/macos/Sources/Views/MemoryView.swift)
│   │   │       ├── [MenuBarView.swift](./apple/macos/Sources/Views/MenuBarView.swift)
│   │   │       ├── [ResourceMeter.swift](./apple/macos/Sources/Views/ResourceMeter.swift)
│   │   │       ├── [SettingsView.swift](./apple/macos/Sources/Views/SettingsView.swift)
│   │   │       ├── [SmallView.swift](./apple/macos/Sources/Views/SmallView.swift)
│   │   │       ├── [SwapView.swift](./apple/macos/Sources/Views/SwapView.swift)
│   │   │       ├── [SystemInfoView.swift](./apple/macos/Sources/Views/SystemInfoView.swift)
│   │   │       ├── [UnavailableView.swift](./apple/macos/Sources/Views/UnavailableView.swift)
│   │   │       └── [UsageThresholdColor.swift](./apple/macos/Sources/Views/UsageThresholdColor.swift)
│   │   ├── Tests/
│   │   │   └── Core/
│   │   │       ├── Models/
│   │   │       │   ├── [CPUStatsTests.swift](./apple/macos/Tests/Core/Models/CPUStatsTests.swift)
│   │   │       │   ├── [DiskStatsTests.swift](./apple/macos/Tests/Core/Models/DiskStatsTests.swift)
│   │   │       │   ├── [MemoryStatsTests.swift](./apple/macos/Tests/Core/Models/MemoryStatsTests.swift)
│   │   │       │   ├── [MenuBarDisplayTests.swift](./apple/macos/Tests/Core/Models/MenuBarDisplayTests.swift)
│   │   │       │   ├── [SwapStatsTests.swift](./apple/macos/Tests/Core/Models/SwapStatsTests.swift)
│   │   │       │   ├── [SystemInfoTests.swift](./apple/macos/Tests/Core/Models/SystemInfoTests.swift)
│   │   │       │   └── [UsageThresholdTests.swift](./apple/macos/Tests/Core/Models/UsageThresholdTests.swift)
│   │   │       ├── [ByteFormatterTests.swift](./apple/macos/Tests/Core/ByteFormatterTests.swift)
│   │   │       └── [SettingsStoreTests.swift](./apple/macos/Tests/Core/SettingsStoreTests.swift)
│   │   ├── [AGENTS.md](./apple/macos/AGENTS.md)
│   │   ├── [LICENSE](./apple/macos/LICENSE)
│   │   ├── [Makefile](./apple/macos/Makefile)
│   │   ├── [Package.swift](./apple/macos/Package.swift)
│   │   ├── [README.md](./apple/macos/README.md)
│   │   └── [TREE.md](./apple/macos/TREE.md)
│   └── [README.md](./apple/README.md)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

15 directories, 61 files
