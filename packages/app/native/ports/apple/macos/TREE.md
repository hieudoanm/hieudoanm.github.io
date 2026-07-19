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
│   ├── [Info.plist](./Resources/Info.plist)
│   └── [Ports.entitlements](./Resources/Ports.entitlements)
├── Sources/
│   ├── App/
│   │   ├── [MenuBarIcon.swift](./Sources/App/MenuBarIcon.swift)
│   │   ├── [PortsApp.swift](./Sources/App/PortsApp.swift)
│   │   └── [PortsViewModel.swift](./Sources/App/PortsViewModel.swift)
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── [NetworkEndpoint.swift](./Sources/Core/Models/NetworkEndpoint.swift)
│   │   │   └── [PortInfo.swift](./Sources/Core/Models/PortInfo.swift)
│   │   ├── Services/
│   │   │   ├── [LsofParser.swift](./Sources/Core/Services/LsofParser.swift)
│   │   │   ├── [LsofPortDiscoveryService.swift](./Sources/Core/Services/LsofPortDiscoveryService.swift)
│   │   │   ├── [PortDiscovering.swift](./Sources/Core/Services/PortDiscovering.swift)
│   │   │   ├── [ProcessTerminating.swift](./Sources/Core/Services/ProcessTerminating.swift)
│   │   │   └── [SignalProcessTerminator.swift](./Sources/Core/Services/SignalProcessTerminator.swift)
│   │   └── [SettingsStore.swift](./Sources/Core/SettingsStore.swift)
│   └── Views/
│       ├── [MenuBarView.swift](./Sources/Views/MenuBarView.swift)
│       ├── [PortListView.swift](./Sources/Views/PortListView.swift)
│       ├── [PortRow.swift](./Sources/Views/PortRow.swift)
│       └── [SettingsView.swift](./Sources/Views/SettingsView.swift)
├── Tests/
│   └── Core/
│       ├── Models/
│       │   └── [PortTests.swift](./Tests/Core/Models/PortTests.swift)
│       ├── Services/
│       │   ├── [LsofParserTests.swift](./Tests/Core/Services/LsofParserTests.swift)
│       │   └── [ProcessTerminationTests.swift](./Tests/Core/Services/ProcessTerminationTests.swift)
│       └── [SettingsStoreTests.swift](./Tests/Core/SettingsStoreTests.swift)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [Package.swift](./Package.swift)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

13 directories, 35 files
