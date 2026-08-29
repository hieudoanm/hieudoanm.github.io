# Ports

```
ports/
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
│   ├── Info.plist
│   └── Ports.entitlements
├── Sources/
│   ├── App/
│   │   ├── PortsApp.swift
│   │   ├── PortsViewModel.swift
│   │   └── MenuBarIcon.swift
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── NetworkEndpoint.swift
│   │   │   └── PortInfo.swift
│   │   ├── Services/
│   │   │   ├── LsofParser.swift
│   │   │   ├── LsofPortDiscoveryService.swift
│   │   │   ├── PortDiscovering.swift
│   │   │   ├── ProcessTerminating.swift
│   │   │   └── SignalProcessTerminator.swift
│   │   └── SettingsStore.swift
│   └── Views/
│       ├── MenuBarView.swift
│       ├── PortListView.swift
│       ├── PortRow.swift
│       └── SettingsView.swift
└── Tests/
    └── Core/
        ├── Models/
        │   └── PortTests.swift
        ├── Services/
        │   ├── LsofParserTests.swift
        │   └── ProcessTerminationTests.swift
        └── SettingsStoreTests.swift
```