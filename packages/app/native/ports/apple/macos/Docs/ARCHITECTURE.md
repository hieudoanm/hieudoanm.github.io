# Architecture

## Goals

- Discover processes listening on local TCP/UDP ports from the menu bar
- Associate ports with the process and project that started them
- Fast, lightweight, local-first menu-bar utility
- Native macOS feel, not a packaged web app

## Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Language       | Swift 5.9+                     |
| UI             | SwiftUI + AppKit               |
| Discovery      | System commands via `Process`  |
| Persistence    | Codable + JSON + FileManager   |
| Logging        | Apple unified logging (`OSLog`)|
| Build          | Swift Package Manager          |
| Min macOS      | 13 Ventura                     |

## Directory Structure

```text
Sources/
├── App/
│   ├── PortsApp.swift
│   ├── PortsViewModel.swift
│   └── MenuBarIcon.swift
├── Core/
│   ├── Models/
│   │   ├── NetworkEndpoint.swift
│   │   └── PortInfo.swift
│   ├── Services/
│   │   ├── LsofParser.swift
│   │   ├── LsofPortDiscoveryService.swift
│   │   └── PortDiscovering.swift
│   └── SettingsStore.swift
└── Views/
    ├── MenuBarView.swift
    ├── PortListView.swift
    ├── PortRow.swift
    └── SettingsView.swift
```

## Application Layers

```text
Menu Bar
    ↓
Popover (MenuBarExtra, .window style)
    ↓
Views
    ↓
PortsViewModel (@MainActor, ObservableObject)
    ↓
Services (Phase 2+)
    ↓
Core (PortInfo, SettingsStore)
```

## Application Type

`LSUIElement` = true and `NSApp.setActivationPolicy(.accessory)` on launch, so
Ports runs without a Dock icon and without a menu bar. The primary surface is a
`MenuBarExtra` popover (`.menuBarExtraStyle(.window)`).

The settings window is a SwiftUI `Window` scene opened with `openWindow(id:)`.
A dedicated `Window` scene is used instead of the `Settings` scene because the
latter cannot be opened programmatically in an `.accessory` menu-bar app on
macOS 14+ (the private `showSettingsWindow:` selector was removed). The app
temporarily switches to `.regular` activation to give the window focus, then
returns to `.accessory` when the settings window closes.

## Domain Model

`PortInfo` describes a listening endpoint bound to a process:

```swift
PortInfo
├── endpoint: NetworkEndpoint  // port, protocol, address
└── process                    // pid, processName, command, paths, state
```

`NetworkEndpoint` is the port/protocol/address tuple and owns the
`localhost:port` copy strings and best-effort HTTP URL.

> The AGENTS.md spec names the model `Port`. It is implemented as `PortInfo`
> because Foundation exposes its renamed `NSPort` as `Port`, which collides
> with the model in every SwiftUI view.

## Discovery

Discovery runs `lsof` via `Process` with explicit executable paths and
arguments — never `sh -c`. Output is parsed defensively by `LsofParser`, a pure
function in `Core`:

```text
lsof -nP -iTCP -sTCP:LISTEN
lsof -nP -iUDP
        ↓
LsofParser (pure, deduplicated, sorted)
        ↓
          PortInfo
```

- TCP rows report `(LISTEN)` sockets; UDP rows report bound sockets
- Connected UDP sockets (`local:port->remote:port`) are skipped
- Rows are deduplicated per (pid, protocol, port, address)
- Process metadata (executable path, command line, cwd) is a Phase 3 concern
  and stays out of the parser

## Search

Search filters on port number, protocol, address, PID, process name, command,
executable path, and working directory. Matching lives on `PortInfo.matches`
so it is unit-testable in `Core`.

## State Management

- `PortsViewModel` — main-actor observable coordinator between Views and Core
- `SettingsStore` — persists user preferences (refresh interval)
- Models are immutable value types

## Refresh

A single coordinated `Task` in `PortsViewModel` refreshes at the configured
interval (default 1s, min 0.5s), diffing old/new state and publishing only when
the set of ports changes. `lsof` runs off the main thread via
`Task.detached` + `waitUntilExit`, so discovery never blocks the UI.

## Styling

- Native SwiftUI with SF Symbols (`cable.connector`) for the menu bar
- Monospaced digits for port numbers and PIDs
- System colors and materials throughout
- Context menus and accessibility labels on every row