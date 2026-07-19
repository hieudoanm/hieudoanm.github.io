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
│   └── [Snap.entitlements](./Resources/Snap.entitlements)
├── Sources/
│   ├── App/
│   │   ├── [SnapApp.swift](./Sources/App/SnapApp.swift)
│   │   └── [SnapViewModel.swift](./Sources/App/SnapViewModel.swift)
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── [AppSettings.swift](./Sources/Core/Models/AppSettings.swift)
│   │   │   ├── [NormalizedRect.swift](./Sources/Core/Models/NormalizedRect.swift)
│   │   │   ├── [ScreenInfo.swift](./Sources/Core/Models/ScreenInfo.swift)
│   │   │   ├── [SnapLayout.swift](./Sources/Core/Models/SnapLayout.swift)
│   │   │   └── [WindowRule.swift](./Sources/Core/Models/WindowRule.swift)
│   │   ├── Utilities/
│   │   │   └── [CoordinateConverter.swift](./Sources/Core/Utilities/CoordinateConverter.swift)
│   │   ├── [LayoutStore.swift](./Sources/Core/LayoutStore.swift)
│   │   └── [SettingsStore.swift](./Sources/Core/SettingsStore.swift)
│   ├── Services/
│   │   ├── [ApplicationManager.swift](./Sources/Services/ApplicationManager.swift)
│   │   ├── [LayoutManager.swift](./Sources/Services/LayoutManager.swift)
│   │   ├── [ShortcutManager.swift](./Sources/Services/ShortcutManager.swift)
│   │   ├── [WindowDiscovery.swift](./Sources/Services/WindowDiscovery.swift)
│   │   ├── [WindowManager.swift](./Sources/Services/WindowManager.swift)
│   │   └── [WorkspaceManager.swift](./Sources/Services/WorkspaceManager.swift)
│   ├── Views/
│   │   ├── [LayoutEditorView.swift](./Sources/Views/LayoutEditorView.swift)
│   │   ├── [LayoutListView.swift](./Sources/Views/LayoutListView.swift)
│   │   ├── [MenuBarView.swift](./Sources/Views/MenuBarView.swift)
│   │   ├── [PermissionView.swift](./Sources/Views/PermissionView.swift)
│   │   └── [SettingsView.swift](./Sources/Views/SettingsView.swift)
│   └── macOS/
│       ├── [AccessibilityManager.swift](./Sources/macOS/AccessibilityManager.swift)
│       ├── [CoreGraphicsManager.swift](./Sources/macOS/CoreGraphicsManager.swift)
│       ├── [ScreenManager.swift](./Sources/macOS/ScreenManager.swift)
│       └── [WorkspaceMonitor.swift](./Sources/macOS/WorkspaceMonitor.swift)
├── Tests/
│   └── Core/
│       ├── Models/
│       │   ├── [AppSettingsTests.swift](./Tests/Core/Models/AppSettingsTests.swift)
│       │   ├── [NormalizedRectTests.swift](./Tests/Core/Models/NormalizedRectTests.swift)
│       │   ├── [ScreenInfoTests.swift](./Tests/Core/Models/ScreenInfoTests.swift)
│       │   ├── [SnapLayoutTests.swift](./Tests/Core/Models/SnapLayoutTests.swift)
│       │   └── [WindowRuleTests.swift](./Tests/Core/Models/WindowRuleTests.swift)
│       ├── Utilities/
│       │   └── [CoordinateConverterTests.swift](./Tests/Core/Utilities/CoordinateConverterTests.swift)
│       ├── [LayoutStoreTests.swift](./Tests/Core/LayoutStoreTests.swift)
│       └── [SettingsStoreTests.swift](./Tests/Core/SettingsStoreTests.swift)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [Package.swift](./Package.swift)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

15 directories, 49 files
