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
│   └── [Mixer.entitlements](./Resources/Mixer.entitlements)
├── Sources/
│   ├── App/
│   │   ├── [MixerApp.swift](./Sources/App/MixerApp.swift)
│   │   └── [MixerViewModel.swift](./Sources/App/MixerViewModel.swift)
│   ├── Audio/
│   │   ├── [AudioProcessDiscovery.swift](./Sources/Audio/AudioProcessDiscovery.swift)
│   │   ├── [AudioVolumeController.swift](./Sources/Audio/AudioVolumeController.swift)
│   │   └── [CoreAudioManager.swift](./Sources/Audio/CoreAudioManager.swift)
│   ├── Core/
│   │   ├── Models/
│   │   │   ├── [AudioApplication.swift](./Sources/Core/Models/AudioApplication.swift)
│   │   │   ├── [AudioDevice.swift](./Sources/Core/Models/AudioDevice.swift)
│   │   │   └── [VolumeState.swift](./Sources/Core/Models/VolumeState.swift)
│   │   └── [SettingsStore.swift](./Sources/Core/SettingsStore.swift)
│   ├── Services/
│   │   ├── [ApplicationManager.swift](./Sources/Services/ApplicationManager.swift)
│   │   ├── [AudioManager.swift](./Sources/Services/AudioManager.swift)
│   │   ├── [SettingsManager.swift](./Sources/Services/SettingsManager.swift)
│   │   └── [ShortcutManager.swift](./Sources/Services/ShortcutManager.swift)
│   └── Views/
│       ├── [AudioApplicationRow.swift](./Sources/Views/AudioApplicationRow.swift)
│       ├── [MenuBarView.swift](./Sources/Views/MenuBarView.swift)
│       ├── [PermissionView.swift](./Sources/Views/PermissionView.swift)
│       └── [SettingsView.swift](./Sources/Views/SettingsView.swift)
├── Tests/
│   └── Core/
│       ├── Models/
│       │   ├── [AudioApplicationTests.swift](./Tests/Core/Models/AudioApplicationTests.swift)
│       │   ├── [AudioDeviceTests.swift](./Tests/Core/Models/AudioDeviceTests.swift)
│       │   └── [VolumeStateTests.swift](./Tests/Core/Models/VolumeStateTests.swift)
│       └── [SettingsStoreTests.swift](./Tests/Core/SettingsStoreTests.swift)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [Package.swift](./Package.swift)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

13 directories, 37 files
