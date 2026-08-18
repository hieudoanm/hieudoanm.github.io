# Architecture

## Goals

- Native macOS window snapping and workspace management
- Save and restore window arrangements
- Multi-monitor support
- Local-first, no backend
- Feels like a native macOS utility

## Tech Stack

| Layer       | Technology               |
| ----------- | ------------------------ |
| Language    | Swift 5.9+               |
| UI          | SwiftUI                  |
| Window Mgmt | Accessibility API        |
| Window Disc | CoreGraphics             |
| App Lifecycle | NSWorkspace           |
| Screens     | NSScreen                 |
| Platform    | macOS 13+                |
| Build       | Swift Package Manager    |
| Package Mgr | Make                     |

## Directory Structure

```txt
Sources/
├── App/
│   ├── SnapApp.swift            # App entry point
│   └── SnapViewModel.swift      # Main view model
├── Models/
│   ├── SnapLayout.swift         # Saved layout model
│   ├── WindowRule.swift         # Window assignment rule
│   ├── NormalizedRect.swift     # Resolution-independent coords
│   ├── ScreenInfo.swift         # Monitor information
│   └── AppSettings.swift        # App settings model
├── Services/
│   ├── WindowManager.swift      # Window move/resize
│   ├── WindowDiscovery.swift    # Find running windows
│   ├── LayoutManager.swift      # Layout save/restore
│   ├── WorkspaceManager.swift   # Workspace operations
│   ├── ApplicationManager.swift # App lifecycle
│   └── ShortcutManager.swift    # Keyboard shortcuts
├── macOS/
│   ├── AccessibilityManager.swift # AX permission + control
│   ├── CoreGraphicsManager.swift  # Window list + screen bounds
│   ├── ScreenManager.swift        # Monitor detection
│   └── WorkspaceMonitor.swift     # App launch/terminate
├── Persistence/
│   ├── LayoutStore.swift        # Layout persistence
│   └── SettingsStore.swift      # Settings persistence
└── Views/
    ├── MenuBarView.swift        # Main menu bar UI
    ├── LayoutListView.swift     # Saved layouts list
    ├── LayoutEditorView.swift   # Layout editor
    ├── SettingsView.swift       # Settings window
    └── PermissionView.swift     # Accessibility permission UI
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  Menu Bar (MenuBarExtra)                │  Entry point
├─────────────────────────────────────────┤
│  Views (SwiftUI)                        │  MenuBarView, LayoutListView
├─────────────────────────────────────────┤
│  ViewModel (SnapViewModel)              │  State + business logic
├─────────────────────────────────────────┤
│  Services (LayoutManager, WindowManager)│  Layout + window ops
├─────────────────────────────────────────┤
│  macOS (Accessibility, CoreGraphics)    │  System integration
├─────────────────────────────────────────┤
│  Persistence (LayoutStore)              │  JSON storage
└─────────────────────────────────────────┘
```

## Window Management

### Core APIs

- **Accessibility API** — Move/resize windows (requires permission)
- **CoreGraphics** — Discover windows, get screen bounds
- **NSWorkspace** — App lifecycle events
- **NSScreen** — Monitor configuration

### Snapping Zones

```txt
┌──────────────────────┬──────────────────────┐
│                      │                      │
│      Top Left        │      Top Right       │
│                      │                      │
├──────────────────────┼──────────────────────┤
│                      │                      │
│     Bottom Left      │     Bottom Right     │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

### Normalized Coordinates

Layouts use normalized coordinates (0-1) instead of pixels:

```json
{
  "x": 0,
  "y": 0,
  "width": 0.5,
  "height": 1
}
```

This allows layouts to adapt to different monitor sizes.

## State Management

- `SnapViewModel` — Main observable object
- Published properties for reactive UI updates
- `LayoutStore` — Persistent saved layouts
- `SettingsStore` — Persistent settings

## Styling

- Native SwiftUI controls
- SF Symbols for icons
- System colors and fonts
- Menu bar extra style (popover)
