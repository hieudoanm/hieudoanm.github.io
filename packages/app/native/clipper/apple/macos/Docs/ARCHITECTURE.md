# Architecture

## Goals

- Native macOS clipboard manager
- Menu-bar utility for quick access
- Clipboard history with search
- Pin important items
- Local-first, no backend
- Feels like a native macOS utility

## Tech Stack

| Layer       | Technology               |
| ----------- | ------------------------ |
| Language    | Swift 5.9+               |
| UI          | SwiftUI                  |
| Clipboard   | NSPasteboard             |
| Platform    | macOS 13+                |
| Build       | Swift Package Manager    |
| Package Mgr | Make                     |

## Directory Structure

```txt
Sources/
├── App/
│   ├── ClipperApp.swift         # App entry point
│   └── ClipperViewModel.swift   # Main view model
├── Models/
│   ├── ClipperItem.swift        # Clipboard item model
│   └── ClipperStore.swift       # Clipboard persistence
├── Services/
│   ├── PasteboardManager.swift  # Pasteboard access
│   └── ClipboardMonitor.swift   # Clipboard change detection
└── Views/
    ├── MenuBarView.swift        # Main menu bar UI
    ├── HistoryView.swift        # Clipboard history list
    └── SettingsView.swift       # Settings window
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  Menu Bar (MenuBarExtra)                │  Entry point
├─────────────────────────────────────────┤
│  Views (SwiftUI)                        │  MenuBarView, HistoryView
├─────────────────────────────────────────┤
│  ViewModel (ClipperViewModel)           │  State + business logic
├─────────────────────────────────────────┤
│  Services (ClipboardMonitor)            │  Clipboard detection
├─────────────────────────────────────────┤
│  Models (ClipperStore)                  │  Persistence
└─────────────────────────────────────────┘
```

## Clipboard Monitoring

- Polls `NSPasteboard` for changes
- Stores text, images, files
- Maintains history with timestamps
- Deduplicates repeated copies

## State Management

- `ClipperViewModel` — Main observable object
- Published properties for reactive UI updates
- `ClipperStore` — Persistent clipboard history

## Styling

- Native SwiftUI controls
- SF Symbols for icons
- System colors and fonts
- Menu bar extra style (popover)
