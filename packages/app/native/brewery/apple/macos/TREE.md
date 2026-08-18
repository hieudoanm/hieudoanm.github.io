# Brewery

```
brewery/apple/macos/
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
│   ├── Brewery.entitlements
│   └── Info.plist
├── Sources/
│   ├── App/
│   │   ├── BreweryApp.swift
│   │   └── BreweryViewModel.swift
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── BrewError.swift
│   │   │   ├── BrewServiceInfo.swift
│   │   │   ├── Package.swift
│   │   │   ├── PackageStatus.swift
│   │   │   └── PackageType.swift
│   │   ├── Services/
│   │   │   ├── BrewClient.swift
│   │   │   ├── BrewExecutable.swift
│   │   │   ├── BrewParser.swift
│   │   │   ├── BrewService.swift
│   │   │   ├── HomebrewService.swift
│   │   │   ├── MockBrewClient.swift
│   │   │   ├── ProcessRunner.swift
│   │   │   └── SystemBrewClient.swift
│   │   └── SettingsStore.swift
│   └── Views/
│       ├── ContentView.swift
│       ├── DiscoverView.swift
│       ├── HomebrewMissingView.swift
│       ├── InstalledView.swift
│       ├── PackageDetailView.swift
│       ├── PackageRow.swift
│       ├── ServicesView.swift
│       ├── SettingsView.swift
│       ├── SidebarView.swift
│       └── UpdatesView.swift
└── Tests/
    └── Core/
        ├── Models/
        │   └── PackageModelTests.swift
        ├── Services/
        │   ├── BrewParserTests.swift
        │   └── HomebrewServiceTests.swift
        └── SettingsStoreTests.swift
```
