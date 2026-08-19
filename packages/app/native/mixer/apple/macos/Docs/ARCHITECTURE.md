# Architecture

## Goals

- Native macOS menu-bar utility for controlling audio volume
- Per-application volume control (if supported by Core Audio)
- System-wide volume control as fallback
- Lightweight, local-first, no backend
- Feels like a native macOS utility

## Tech Stack

| Layer       | Technology               |
| ----------- | ------------------------ |
| Language    | Swift 5.9+               |
| UI          | SwiftUI                  |
| Audio       | Core Audio               |
| Platform    | macOS 13+                |
| Build       | Swift Package Manager    |
| Package Mgr | Make                     |

## Directory Structure

```txt
Sources/
├── App/
│   ├── MixerApp.swift           # App entry point
│   └── MixerViewModel.swift     # Main view model
├── Models/
│   ├── AudioApplication.swift   # Application model
│   ├── AudioDevice.swift        # Audio device model
│   └── VolumeState.swift        # Volume state model
├── Audio/
│   ├── CoreAudioManager.swift   # Core Audio interface
│   ├── AudioProcessDiscovery.swift  # App discovery
│   └── AudioVolumeController.swift  # Volume control
├── Services/
│   ├── AudioManager.swift       # Audio service facade
│   ├── ApplicationManager.swift # App lifecycle
│   ├── SettingsManager.swift    # Settings management
│   └── ShortcutManager.swift    # Keyboard shortcuts
├── Persistence/
│   └── SettingsStore.swift      # Settings persistence
└── Views/
    ├── MenuBarView.swift        # Main menu bar UI
    ├── AudioApplicationRow.swift # App row component
    ├── SettingsView.swift       # Settings window
    └── PermissionView.swift     # Permission UI
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  Menu Bar (MenuBarExtra)                │  Entry point
├─────────────────────────────────────────┤
│  Views (SwiftUI)                        │  MenuBarView, SettingsView
├─────────────────────────────────────────┤
│  ViewModel (MixerViewModel)             │  State + business logic
├─────────────────────────────────────────┤
│  Services (AudioManager)                │  Audio facade
├─────────────────────────────────────────┤
│  Audio (Core Audio)                     │  Device control
└─────────────────────────────────────────┘
```

## Audio Architecture

### Core Audio Integration

- `CoreAudioManager` — Low-level Core Audio API wrapper
- `AudioProcessDiscovery` — Detects running applications
- `AudioVolumeController` — Controls system volume

### Per-Application Volume

macOS does not provide a public API for per-process volume control like
Windows does. The current implementation:

1. Lists all running applications with visible windows
2. Shows system-wide volume control
3. Marks potential audio apps based on heuristics

### Limitations

- No true per-app volume control via public APIs
- App detection based on window list and bundle identifiers
- "Playing" status is heuristic, not actual audio detection

## State Management

- `MixerViewModel` — Main observable object
- Published properties for reactive UI updates
- Combine for notification binding
- `SettingsStore` — Persistent settings via JSON

## Styling

- Native SwiftUI controls
- SF Symbols for icons
- System colors and fonts
- Menu bar extra style (popover)
