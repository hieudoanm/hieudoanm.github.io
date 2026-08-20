# Architecture

## Goals

- Pin any window to always-on-top with one click
- Menu-bar utility for quick access
- Persist pinned windows across sessions
- Re-pin windows automatically when apps relaunch
- Lightweight and native macOS feel
- Local-first, no backend

## Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Language       | Swift 5.9+                      |
| UI             | SwiftUI                         |
| Window Control | Accessibility API (AXUIElement) |
| App Discovery  | NSWorkspace                     |
| Persistence    | Codable + JSON + FileManager    |
| Build          | Swift Package Manager           |
| Min macOS      | 13 Ventura                      |

## Directory Structure

```text
Sources/
├── App/
│   ├── TopApp.swift
│   └── TopViewModel.swift
├── Core/
│   ├── Models/
│   │   ├── AppIdentifier.swift
│   │   └── PinnedWindow.swift
│   ├── SettingsStore.swift
│   └── PinnedWindowStore.swift
├── Services/
│   ├── AccessibilityManager.swift
│   ├── WindowDiscovery.swift
│   └── WindowPinningService.swift
└── Views/
    ├── MenuBarView.swift
    ├── PermissionView.swift
    └── SettingsView.swift
```

## Application Layers

```text
┌──────────────────────────────────┐
│           Menu Bar               │
├──────────────────────────────────┤
│            Views                 │
│  MenuBarView | PermissionView    │
│  SettingsView                    │
├──────────────────────────────────┤
│          ViewModel               │
│         TopViewModel             │
├──────────────────────────────────┤
│           Services               │
│  WindowPinningService            │
│  WindowDiscovery                 │
│  AccessibilityManager            │
├──────────────────────────────────┤
│             Core                 │
│  AppIdentifier | PinnedWindow    │
│  PinnedWindowStore               │
│  SettingsStore                   │
└──────────────────────────────────┘
```

## Window Pinning

### Accessibility API

Top uses the Accessibility API to control window levels:

```text
Find window (AXUIElement)
        ↓
Get window title (kAXTitleAttribute)
        ↓
Set window level (AXWindowLevel)
        ↓
  Level 0 = normal
  Level 25 = always-on-top
```

### Window Discovery

Top discovers windows through a two-step process:

1. Query `NSWorkspace.shared.runningApplications` for regular apps
2. For each app, call `AXUIElementCopyAttributeValue` with `kAXWindowsAttribute`
3. Extract window titles from each `AXUIElement`

### Pinning Mechanism

```text
User clicks window
        ↓
Toggle AXWindowLevel between 0 and 25
        ↓
Persist to pinned_windows.json
```

### Limitations

- Requires Accessibility permission
- Some apps block Accessibility access (System Preferences, secure input)
- Metal/OpenGL fullscreen apps may ignore level changes
- Window title must be non-empty for identification
- Pinned state resets when the pinned app closes the window

## State Management

- `TopViewModel` — observable coordinator between Views and Services
- `PinnedWindowStore` — persists pinned window records
- `SettingsStore` — persists user preferences

## Styling

- Native SwiftUI
- SF Symbols for all icons
- System colors and fonts
- `MenuBarExtra` popover as primary UI surface
- `.frame(width: 300)` for consistent menu width
