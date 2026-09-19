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
│   ├── [MacOSX.entitlements](./Resources/MacOSX.entitlements)
│   └── [Info.plist](./Resources/Info.plist)
├── Sources/
│   ├── App/
│   │   ├── Battery/
│   │   │   └── [BatteryViewModel.swift](./Sources/App/Battery/BatteryViewModel.swift)
│   │   ├── Clipboard/
│   │   │   └── [ClipboardViewModel.swift](./Sources/App/Clipboard/ClipboardViewModel.swift)
│   │   ├── Front/
│   │   │   └── [AppsViewModel.swift](./Sources/App/Front/AppsViewModel.swift)
│   │   ├── IP/
│   │   │   └── [IPViewModel.swift](./Sources/App/IP/IPViewModel.swift)
│   │   ├── Memory/
│   │   │   └── [MemoryViewModel.swift](./Sources/App/Memory/MemoryViewModel.swift)
│   │   ├── Network/
│   │   │   └── [NetworkViewModel.swift](./Sources/App/Network/NetworkViewModel.swift)
│   │   ├── Ports/
│   │   │   └── [PortsViewModel.swift](./Sources/App/Ports/PortsViewModel.swift)
│   │   ├── Shared/
│   │   │   ├── [MacOSXApp.swift](./Sources/App/Shared/MacOSXApp.swift)
│   │   │   ├── [LaunchAtLogin.swift](./Sources/App/Shared/LaunchAtLogin.swift)
│   │   │   ├── [MenuBarIcon.swift](./Sources/App/Shared/MenuBarIcon.swift)
│   │   │   └── [MenuBarPanelPositioner.swift](./Sources/App/Shared/MenuBarPanelPositioner.swift)
│   │   └── Workspaces/
│   │       └── [WorkspacesViewModel.swift](./Sources/App/Workspaces/WorkspacesViewModel.swift)
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── Battery/
│   │   │   │   └── [BatteryInfo.swift](./Sources/Core/Models/Battery/BatteryInfo.swift)
│   │   │   ├── Clipboard/
│   │   │   │   ├── [ClipboardItem.swift](./Sources/Core/Models/Clipboard/ClipboardItem.swift)
│   │   │   │   └── [ClipboardStore.swift](./Sources/Core/Models/Clipboard/ClipboardStore.swift)
│   │   │   ├── Front/
│   │   │   │   └── [RunningAppInfo.swift](./Sources/Core/Models/Front/RunningAppInfo.swift)
│   │   │   ├── IP/
│   │   │   │   ├── [DNSResponse.swift](./Sources/Core/Models/IP/DNSResponse.swift)
│   │   │   │   └── [IPInfo.swift](./Sources/Core/Models/IP/IPInfo.swift)
│   │   │   ├── Memory/
│   │   │   │   ├── [CPUStats.swift](./Sources/Core/Models/Memory/CPUStats.swift)
│   │   │   │   ├── [DiskStats.swift](./Sources/Core/Models/Memory/DiskStats.swift)
│   │   │   │   ├── [MemoryStats.swift](./Sources/Core/Models/Memory/MemoryStats.swift)
│   │   │   │   ├── [SwapStats.swift](./Sources/Core/Models/Memory/SwapStats.swift)
│   │   │   │   └── [SystemInfo.swift](./Sources/Core/Models/Memory/SystemInfo.swift)
│   │   │   ├── Network/
│   │   │   │   ├── [NetworkSnapshots.swift](./Sources/Core/Models/Network/NetworkSnapshots.swift)
│   │   │   │   └── [NetworkStats.swift](./Sources/Core/Models/Network/NetworkStats.swift)
│   │   │   ├── Ports/
│   │   │   │   ├── [NetworkEndpoint.swift](./Sources/Core/Models/Ports/NetworkEndpoint.swift)
│   │   │   │   └── [PortInfo.swift](./Sources/Core/Models/Ports/PortInfo.swift)
│   │   │   └── Shared/
│   │   │       ├── [MenuBarDisplay.swift](./Sources/Core/Models/Shared/MenuBarDisplay.swift)
│   │   │       └── [UsageThreshold.swift](./Sources/Core/Models/Shared/UsageThreshold.swift)
│   │   │   └── Workspaces/
│   │   │       ├── [NormalizedRect.swift](./Sources/Core/Models/Workspaces/NormalizedRect.swift)
│   │   │       ├── [ScreenInfo.swift](./Sources/Core/Models/Workspaces/ScreenInfo.swift)
│   │   │       ├── [Workspace.swift](./Sources/Core/Models/Workspaces/Workspace.swift)
│   │   │       └── [WorkspaceWindow.swift](./Sources/Core/Models/Workspaces/WorkspaceWindow.swift)
│   │   ├── Services/
│   │   │   ├── Battery/
│   │   │   │   └── [BatteryInfoParsing.swift](./Sources/Core/Services/Battery/BatteryInfoParsing.swift)
│   │   │   ├── Front/
│   │   │   │   ├── [RunningAppProviding.swift](./Sources/Core/Services/Front/RunningAppProviding.swift)
│   │   │   │   └── [RunningAppsDiscoveryService.swift](./Sources/Core/Services/Front/RunningAppsDiscoveryService.swift)
│   │   │   ├── IP/
│   │   │   │   ├── [IPInfoParsing.swift](./Sources/Core/Services/IP/IPInfoParsing.swift)
│   │   │   │   └── [IPLookupServicing.swift](./Sources/Core/Services/IP/IPLookupServicing.swift)
│   │   │   ├── Network/
│   │   │   │   └── [NetworkInterfaceClassifying.swift](./Sources/Core/Services/Network/NetworkInterfaceClassifying.swift)
│   │   │   └── Ports/
│   │   │       ├── [LsofParser.swift](./Sources/Core/Services/Ports/LsofParser.swift)
│   │   │       ├── [LsofPortDiscoveryService.swift](./Sources/Core/Services/Ports/LsofPortDiscoveryService.swift)
│   │   │       ├── [PortDiscovering.swift](./Sources/Core/Services/Ports/PortDiscovering.swift)
│   │   │       ├── [ProcessTerminating.swift](./Sources/Core/Services/Ports/ProcessTerminating.swift)
│   │   │       └── [SignalProcessTerminator.swift](./Sources/Core/Services/Ports/SignalProcessTerminator.swift)
│   │   │   └── Workspaces/
│   │   │       ├── [CoordinateConverter.swift](./Sources/Core/Services/Workspaces/CoordinateConverter.swift)
│   │   │       ├── [WindowListing.swift](./Sources/Core/Services/Workspaces/WindowListing.swift)
│   │   │       ├── [WorkspaceCapturing.swift](./Sources/Core/Services/Workspaces/WorkspaceCapturing.swift)
│   │   │       ├── [WorkspaceRestoring.swift](./Sources/Core/Services/Workspaces/WorkspaceRestoring.swift)
│   │   │       ├── [WorkspaceStore.swift](./Sources/Core/Services/Workspaces/WorkspaceStore.swift)
│   │   │       ├── [WorkspaceStoring.swift](./Sources/Core/Services/Workspaces/WorkspaceStoring.swift)
│   │   │       └── [WorkspaceWindowBuilder.swift](./Sources/Core/Services/Workspaces/WorkspaceWindowBuilder.swift)
│   │   ├── [ByteFormatter.swift](./Sources/Core/ByteFormatter.swift)
│   │   └── [SettingsStore.swift](./Sources/Core/SettingsStore.swift)
│   ├── Services/
│   │   ├── Battery/
│   │   │   └── [BatteryMonitor.swift](./Sources/Services/Battery/BatteryMonitor.swift)
│   │   ├── Clipboard/
│   │   │   ├── [ClipboardMonitor.swift](./Sources/Services/Clipboard/ClipboardMonitor.swift)
│   │   │   └── [PasteboardManager.swift](./Sources/Services/Clipboard/PasteboardManager.swift)
│   │   ├── IP/
│   │   │   └── [IPLookupService.swift](./Sources/Services/IP/IPLookupService.swift)
│   │   ├── Memory/
│   │   │   ├── [CPUMonitor.swift](./Sources/Services/Memory/CPUMonitor.swift)
│   │   │   ├── [DiskMonitor.swift](./Sources/Services/Memory/DiskMonitor.swift)
│   │   │   ├── [MemoryMonitor.swift](./Sources/Services/Memory/MemoryMonitor.swift)
│   │   │   ├── [MemoryPressureMonitor.swift](./Sources/Services/Memory/MemoryPressureMonitor.swift)
│   │   │   ├── [SwapMonitor.swift](./Sources/Services/Memory/SwapMonitor.swift)
│   │   │   └── [SystemInfoMonitor.swift](./Sources/Services/Memory/SystemInfoMonitor.swift)
│   │   ├── Network/
│   │   │   ├── [IOKitNetworkInterfaceClassifier.swift](./Sources/Services/Network/IOKitNetworkInterfaceClassifier.swift)
│   │   │   └── [NetworkMonitor.swift](./Sources/Services/Network/NetworkMonitor.swift)
│   │   └── Shared/
│   │       └── [MonitorError.swift](./Sources/Services/Shared/MonitorError.swift)
│   │   └── Workspaces/
│   │       ├── [AccessibilityManager.swift](./Sources/Services/Workspaces/AccessibilityManager.swift)
│   │       ├── [ApplicationLauncher.swift](./Sources/Services/Workspaces/ApplicationLauncher.swift)
│   │       ├── [CoreGraphicsWindowLister.swift](./Sources/Services/Workspaces/CoreGraphicsWindowLister.swift)
│   │       ├── [ScreenManager.swift](./Sources/Services/Workspaces/ScreenManager.swift)
│   │       ├── [WindowArranger.swift](./Sources/Services/Workspaces/WindowArranger.swift)
│   │       ├── [WorkspaceCaptureService.swift](./Sources/Services/Workspaces/WorkspaceCaptureService.swift)
│   │       └── [WorkspaceRestoreService.swift](./Sources/Services/Workspaces/WorkspaceRestoreService.swift)
│   └── Views/
│       ├── Battery/
│       │   └── [BatteryView.swift](./Sources/Views/Battery/BatteryView.swift)
│       ├── Clipboard/
│       │   └── [ClipboardView.swift](./Sources/Views/Clipboard/ClipboardView.swift)
│       ├── Front/
│       │   ├── [AppRow.swift](./Sources/Views/Front/AppRow.swift)
│       │   ├── [AppsListView.swift](./Sources/Views/Front/AppsListView.swift)
│       │   └── [AppsView.swift](./Sources/Views/Front/AppsView.swift)
│       ├── IP/
│       │   └── [IPView.swift](./Sources/Views/IP/IPView.swift)
│       ├── Memory/
│       │   ├── [CPUView.swift](./Sources/Views/Memory/CPUView.swift)
│       │   ├── [DetailsView.swift](./Sources/Views/Memory/DetailsView.swift)
│       │   ├── [DiskView.swift](./Sources/Views/Memory/DiskView.swift)
│       │   ├── [MemoryView.swift](./Sources/Views/Memory/MemoryView.swift)
│       │   ├── [SmallView.swift](./Sources/Views/Memory/SmallView.swift)
│       │   ├── [SwapView.swift](./Sources/Views/Memory/SwapView.swift)
│       │   └── [SystemInfoView.swift](./Sources/Views/Memory/SystemInfoView.swift)
│       ├── Network/
│       │   └── [NetworkView.swift](./Sources/Views/Network/NetworkView.swift)
│       ├── Ports/
│       │   ├── [PortListView.swift](./Sources/Views/Ports/PortListView.swift)
│       │   ├── [PortRow.swift](./Sources/Views/Ports/PortRow.swift)
│       │   └── [PortsView.swift](./Sources/Views/Ports/PortsView.swift)
│       └── Shared/
│           ├── [MenuBarView.swift](./Sources/Views/Shared/MenuBarView.swift)
│           ├── [ResourceMeter.swift](./Sources/Views/Shared/ResourceMeter.swift)
│           ├── [SettingsView.swift](./Sources/Views/Shared/SettingsView.swift)
│           ├── [TabLayout.swift](./Sources/Views/Shared/TabLayout.swift)
│           ├── [UnavailableView.swift](./Sources/Views/Shared/UnavailableView.swift)
│           └── [UsageThresholdColor.swift](./Sources/Views/Shared/UsageThresholdColor.swift)
│       └── Workspaces/
│           ├── [WorkspaceRow.swift](./Sources/Views/Workspaces/WorkspaceRow.swift)
│           └── [WorkspacesView.swift](./Sources/Views/Workspaces/WorkspacesView.swift)
├── Tests/
│   └── Core/
│       ├── Models/
│       │   ├── Battery/
│       │   │   └── [BatteryInfoTests.swift](./Tests/Core/Models/Battery/BatteryInfoTests.swift)
│       │   ├── Clipboard/
│       │   │   ├── [ClipboardItemTests.swift](./Tests/Core/Models/Clipboard/ClipboardItemTests.swift)
│       │   │   └── [ClipboardStoreTests.swift](./Tests/Core/Models/Clipboard/ClipboardStoreTests.swift)
│       │   ├── Memory/
│       │   │   ├── [CPUStatsTests.swift](./Tests/Core/Models/Memory/CPUStatsTests.swift)
│       │   │   ├── [DiskStatsTests.swift](./Tests/Core/Models/Memory/DiskStatsTests.swift)
│       │   │   ├── [MemoryStatsTests.swift](./Tests/Core/Models/Memory/MemoryStatsTests.swift)
│       │   │   ├── [SwapStatsTests.swift](./Tests/Core/Models/Memory/SwapStatsTests.swift)
│       │   │   └── [SystemInfoTests.swift](./Tests/Core/Models/Memory/SystemInfoTests.swift)
│       │   ├── Network/
│       │   │   ├── [NetworkEndpointTests.swift](./Tests/Core/Models/Network/NetworkEndpointTests.swift)
│       │   │   └── [NetworkStatsTests.swift](./Tests/Core/Models/Network/NetworkStatsTests.swift)
│       │   ├── Ports/
│       │   │   └── [PortTests.swift](./Tests/Core/Models/Ports/PortTests.swift)
│       │   └── Shared/
│       │       ├── [MenuBarDisplayTests.swift](./Tests/Core/Models/Shared/MenuBarDisplayTests.swift)
│       │       └── [UsageThresholdTests.swift](./Tests/Core/Models/Shared/UsageThresholdTests.swift)
│       │   └── Workspaces/
│       │       ├── [NormalizedRectTests.swift](./Tests/Core/Models/Workspaces/NormalizedRectTests.swift)
│       │       ├── [ScreenInfoTests.swift](./Tests/Core/Models/Workspaces/ScreenInfoTests.swift)
│       │       ├── [WorkspaceTests.swift](./Tests/Core/Models/Workspaces/WorkspaceTests.swift)
│       │       └── [WorkspaceWindowTests.swift](./Tests/Core/Models/Workspaces/WorkspaceWindowTests.swift)
│       ├── Services/
│       │   ├── Battery/
│       │   │   └── [BatteryInfoParsingTests.swift](./Tests/Core/Services/Battery/BatteryInfoParsingTests.swift)
│       │   ├── Front/
│       │   │   └── [RunningAppsDiscoveryTests.swift](./Tests/Core/Services/Front/RunningAppsDiscoveryTests.swift)
│       │   ├── IP/
│       │   │   └── [IPInfoParsingTests.swift](./Tests/Core/Services/IP/IPInfoParsingTests.swift)
│       │   ├── Ports/
│       │   │   ├── [LsofParserTests.swift](./Tests/Core/Services/Ports/LsofParserTests.swift)
│       │   │   └── [ProcessTerminationTests.swift](./Tests/Core/Services/Ports/ProcessTerminationTests.swift)
│       │   └── Workspaces/
│       │       ├── [CoordinateConverterTests.swift](./Tests/Core/Services/Workspaces/CoordinateConverterTests.swift)
│       │       ├── [WorkspaceStoreTests.swift](./Tests/Core/Services/Workspaces/WorkspaceStoreTests.swift)
│       │       └── [WorkspaceWindowBuilderTests.swift](./Tests/Core/Services/Workspaces/WorkspaceWindowBuilderTests.swift)
│       ├── [ByteFormatterTests.swift](./Tests/Core/ByteFormatterTests.swift)
│       └── [SettingsStoreTests.swift](./Tests/Core/SettingsStoreTests.swift)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [Package.swift](./Package.swift)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

66 directories, 141 files