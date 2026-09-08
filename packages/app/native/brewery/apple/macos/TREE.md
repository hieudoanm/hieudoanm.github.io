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
│   │   │   ├── [InstalledApp.swift](./Sources/Core/Models/InstalledApp.swift)
│   │   │   ├── [Package.swift](./Sources/Core/Models/Package.swift)
│   │   │   ├── [PackageStatus.swift](./Sources/Core/Models/PackageStatus.swift)
│   │   │   └── [PackageType.swift](./Sources/Core/Models/PackageType.swift)
│   │   ├── Services/
│   │   │   ├── Applications/
│   │   │   │   └── [AppCatalog.swift](./Sources/Core/Services/Applications/AppCatalog.swift)
│   │   │   └── Homebrew/
│   │   │       ├── [BrewClient.swift](./Sources/Core/Services/Homebrew/BrewClient.swift)
│   │   │       ├── [BrewExecutable.swift](./Sources/Core/Services/Homebrew/BrewExecutable.swift)
│   │   │       ├── [BrewParser.swift](./Sources/Core/Services/Homebrew/BrewParser.swift)
│   │   │       ├── [BrewService.swift](./Sources/Core/Services/Homebrew/BrewService.swift)
│   │   │       ├── [HomebrewService.swift](./Sources/Core/Services/Homebrew/HomebrewService.swift)
│   │   │       ├── [MockBrewClient.swift](./Sources/Core/Services/Homebrew/MockBrewClient.swift)
│   │   │       ├── [ProcessRunner.swift](./Sources/Core/Services/Homebrew/ProcessRunner.swift)
│   │   │       └── [SystemBrewClient.swift](./Sources/Core/Services/Homebrew/SystemBrewClient.swift)
│   │   └── [SettingsStore.swift](./Sources/Core/SettingsStore.swift)
│   └── Views/
│       ├── Applications/
│       │   ├── [AppRow.swift](./Sources/Views/Applications/AppRow.swift)
│       │   ├── [AppTile.swift](./Sources/Views/Applications/AppTile.swift)
│       │   └── [AppsView.swift](./Sources/Views/Applications/AppsView.swift)
│       ├── Homebrew/
│       │   ├── [DiscoverView.swift](./Sources/Views/Homebrew/DiscoverView.swift)
│       │   ├── [HomebrewMissingView.swift](./Sources/Views/Homebrew/HomebrewMissingView.swift)
│       │   ├── [InstalledView.swift](./Sources/Views/Homebrew/InstalledView.swift)
│       │   ├── [PackageDetailView.swift](./Sources/Views/Homebrew/PackageDetailView.swift)
│       │   ├── [PackageRow.swift](./Sources/Views/Homebrew/PackageRow.swift)
│       │   ├── [ServicesView.swift](./Sources/Views/Homebrew/ServicesView.swift)
│       │   └── [UpdatesView.swift](./Sources/Views/Homebrew/UpdatesView.swift)
│       ├── [ContentView.swift](./Sources/Views/ContentView.swift)
│       ├── [SettingsView.swift](./Sources/Views/SettingsView.swift)
│       └── [SidebarView.swift](./Sources/Views/SidebarView.swift)
├── Tests/
│   └── Core/
│       ├── Models/
│       │   └── [PackageModelTests.swift](./Tests/Core/Models/PackageModelTests.swift)
│       ├── Services/
│       │   ├── [AppCatalogTests.swift](./Tests/Core/Services/AppCatalogTests.swift)
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

17 directories, 52 files
