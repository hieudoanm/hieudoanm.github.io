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
│   ├── [Brewery.entitlements](./Resources/Brewery.entitlements)
│   └── [Info.plist](./Resources/Info.plist)
├── Sources/
│   ├── App/
│   │   ├── [BreweryApp.swift](./Sources/App/BreweryApp.swift)
│   │   └── [BreweryViewModel.swift](./Sources/App/BreweryViewModel.swift)
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── [BrewError.swift](./Sources/Core/Models/BrewError.swift)
│   │   │   ├── [BrewServiceInfo.swift](./Sources/Core/Models/BrewServiceInfo.swift)
│   │   │   ├── [Package.swift](./Sources/Core/Models/Package.swift)
│   │   │   ├── [PackageStatus.swift](./Sources/Core/Models/PackageStatus.swift)
│   │   │   └── [PackageType.swift](./Sources/Core/Models/PackageType.swift)
│   │   ├── Services/
│   │   │   ├── [BrewClient.swift](./Sources/Core/Services/BrewClient.swift)
│   │   │   ├── [BrewExecutable.swift](./Sources/Core/Services/BrewExecutable.swift)
│   │   │   ├── [BrewParser.swift](./Sources/Core/Services/BrewParser.swift)
│   │   │   ├── [BrewService.swift](./Sources/Core/Services/BrewService.swift)
│   │   │   ├── [HomebrewService.swift](./Sources/Core/Services/HomebrewService.swift)
│   │   │   ├── [MockBrewClient.swift](./Sources/Core/Services/MockBrewClient.swift)
│   │   │   ├── [ProcessRunner.swift](./Sources/Core/Services/ProcessRunner.swift)
│   │   │   └── [SystemBrewClient.swift](./Sources/Core/Services/SystemBrewClient.swift)
│   │   └── [SettingsStore.swift](./Sources/Core/SettingsStore.swift)
│   └── Views/
│       ├── [ContentView.swift](./Sources/Views/ContentView.swift)
│       ├── [DiscoverView.swift](./Sources/Views/DiscoverView.swift)
│       ├── [HomebrewMissingView.swift](./Sources/Views/HomebrewMissingView.swift)
│       ├── [InstalledView.swift](./Sources/Views/InstalledView.swift)
│       ├── [PackageDetailView.swift](./Sources/Views/PackageDetailView.swift)
│       ├── [PackageRow.swift](./Sources/Views/PackageRow.swift)
│       ├── [ServicesView.swift](./Sources/Views/ServicesView.swift)
│       ├── [SettingsView.swift](./Sources/Views/SettingsView.swift)
│       ├── [SidebarView.swift](./Sources/Views/SidebarView.swift)
│       └── [UpdatesView.swift](./Sources/Views/UpdatesView.swift)
├── Tests/
│   └── Core/
│       ├── Models/
│       │   └── [PackageModelTests.swift](./Tests/Core/Models/PackageModelTests.swift)
│       ├── Services/
│       │   ├── [BrewParserTests.swift](./Tests/Core/Services/BrewParserTests.swift)
│       │   └── [HomebrewServiceTests.swift](./Tests/Core/Services/HomebrewServiceTests.swift)
│       └── [SettingsStoreTests.swift](./Tests/Core/SettingsStoreTests.swift)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [Package.swift](./Package.swift)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

13 directories, 46 files
