# Top — AI Agent Development Guide

## 1. Project Overview

**Top** is an always-on-top utility for macOS.

Top is a lightweight native macOS menu-bar utility that pins any window to
always-on-top with a single click, and remembers pinned windows across sessions
so they are re-pinned automatically when apps relaunch.

The application exists because macOS has no built-in "always-on-top" toggle:

```text
Window A is behind window B
        ↓
You want A above everything
        ↓
(macOS: no first-class toggle)
```

Top solves this through the Accessibility API and, where available, WindowServer
window-level control.

---

## 2. Product Definition

Top is:

> A native macOS menu-bar utility that pins windows to always-on-top and remembers
> the pinned set.

Top is NOT:

- A window manager.
- A tiling window manager.
- A screen recorder.
- A window layout/tiling tool.
- A remote control app.
- A network service.
- An automation scripting tool.

**The system window server remains the source of truth.**

Top only changes the window level of user-selected windows.

---

## 3. Product Principles

### 3.1 Native macOS application

Use native macOS technologies:

```text
Swift
SwiftUI
AppKit
ApplicationServices (AXUIElement)
CoreGraphics (CGWindowList)
Foundation
Swift Package Manager
```

Do NOT use:

- Electron
- Tauri
- React
- WebView-based UI
- JavaScript runtimes

### 3.2 Lightweight

Top should be significantly lighter than an Electron-based utility.

Priorities:

1. Fast startup.
2. Low idle CPU usage.
3. Low memory usage.
4. No unnecessary background processes.
5. No network services.
6. No telemetry by default.

### 3.3 Minimal permissions

Top requires Accessibility permission to discover and target windows.

- Ask for Accessibility permission with clear onboarding.
- Do NOT request Full Disk Access, Screen Recording, or admin privileges.
- Never attempt to bypass macOS security mechanisms.

### 3.4 Native feel

Top must feel like a first-class macOS utility: menu bar popover, SF Symbols,
system colors and fonts, standard interactions.

---

## 4. Target Users

Primary users:

- Developers
- Writers and researchers
- Multitaskers
- Users comparing documents side by side
- Anyone who keeps reference material open

Primary use cases:

```text
Keep reference doc above my editor
        ↓
Pin once from the menu bar
        ↓
It stays on top
        ↓
Reopen the app later
        ↓
Still pinned
```

---

## 5. Architecture

Actual sources:

```text
Sources/
├── App/
│   ├── TopApp.swift            # App + MenuBarExtra entry point
│   └── TopViewModel.swift      # Observable coordinator
├── Core/
│   ├── Models/
│   │   ├── AppIdentifier.swift # Bundle + window title identity
│   │   └── PinnedWindow.swift  # Pinned record model
│   ├── SettingsStore.swift     # User preferences
│   └── PinnedWindowStore.swift # Persisted pinned set
├── Services/
│   ├── AccessibilityManager.swift # AX permission + AXUIElement helpers
│   ├── CGSManager.swift        # SkyLight (CGSSetWindowLevel) bridge
│   ├── WindowDiscovery.swift   # Enumerate running apps + their windows
│   └── WindowPinningService.swift # Pin/unpin orchestration
└── Views/
    ├── MenuBarView.swift       # Menu bar popover UI
    ├── PermissionView.swift    # Accessibility onboarding
    └── SettingsView.swift      # Settings window
```

SPM targets:

| Target     | Path           | Notes                                                      |
| ---------- | -------------- | ---------------------------------------------------------- |
| `TopCore`  | `Sources/Core` | UI-independent models/stores                               |
| `Top`      | `Sources`      | Executable; links Cocoa, ApplicationServices, CoreGraphics |
| `TopTests` | `Tests`        | Tests `TopCore`                                            |

Maintain separation between layers:

```text
Views (SwiftUI)
    ↓
ViewModel (TopViewModel)
    ↓
Services (WindowPinningService / WindowDiscovery / AccessibilityManager / CGSManager)
    ↓
Core (Models / Stores)
```

Views must not call AX or CGS APIs directly.

---

## 6. Window Pinning Mechanism

Top pins windows using one (or both) of two mechanisms:

### Primary: Accessibility API (`AXUIElement`)

```text
Find app by PID
        ↓
AXUIElementCreateApplication(pid)
        ↓
Copy kAXWindowsAttribute
        ↓
Read kAXTitleAttribute for each window
```

The AXUIElement route gives Top access to window identity and titles, and is
also how the architecture doc describes the initial level change
(`AXWindowLevel` 0 ↔ 25).

### Optimized: CGS / SkyLight private API

`CGSManager` dynamically loads SkyLight and uses:

- `CGSMainConnectionID()`
- `CGSSetWindowLevel(connection, windowID, level)`

and resolves a window ID via `CGWindowListCopyWindowInfo` (owner PID + title +
layer 0).

Guardrails for the CGS path:

- Load via `dlopen`/`dlsym`; every symbol lookup must handle failure.
- `isAvailable` must be honored — when the library or symbols are unavailable,
  pinning must fail gracefully (return `false`), never crash.
- Window ID lookup must match owner PID, exact title, and layer 0.
- CGS is a private, undocumented API. It may break on future macOS. Treat it as
  an optimization over the Accessibility path, not the only path.

---

## 7. Window Discovery

`WindowDiscovery` enumerates:

1. `NSWorkspace.shared.runningApplications` (regular apps)
2. For each app, its accessibility windows (`kAXWindowsAttribute`)
3. Each window's title (`kAXTitleAttribute`)

Rules:

- Skip apps without windows.
- Skip apps not running as regular applications.
- Skip windows with empty titles (they can't be identified reliably).
- Discovery runs on demand (refresh), not continuously.

---

## 8. Pin / Unpin Operations

`WindowPinningService` exposes:

```swift
checkPermission() -> Bool
requestPermission()

pinWindow(pid:title:) -> Bool
unpinWindow(pid:title:) -> Bool

pinByAppIdentifier(_:) -> Bool
unpinByAppIdentifier(_:) -> Bool
```

Behavior:

- Pin → set window level to 25.
- Unpin → set window level to 0.
- When CGS is unavailable, fall back to AX-based level setting if implemented.
- Never return a false success: if the operation did not confirm, return
  `false`.

---

## 9. App Identity & Persistence

Pinned windows are identified by `AppIdentifier` (bundle identifier + window
title), stored as `PinnedWindow` records.

`PinnedWindowStore`:

- Storage: `~/Library/Application Support/Top/pinned_windows.json`
- Format: Codable JSON (ISO-8601 dates)
- API: `add`, `remove`, `contains`, `clearAll`, `pinnedIdentifiers`

`SettingsStore`:

- Persists user preferences (e.g., launch at login, re-pin on relaunch).

Guardrails:

- Keep stores in `TopCore` (no AppKit/SwiftUI imports).
- Persist atomically on every mutation.
- Corrupt JSON on load must degrade to empty, not crash.

---

## 10. Re-pin on Relaunch

Pinned windows must survive app restarts:

```text
App launches
        ↓
Load pinned_windows.json
        ↓
For each saved AppIdentifier
        ↓
Find matching running window(s)
        ↓
Re-pin
```

Behavior notes:

- Re-pinning is best-effort; an app may not be running yet.
- Do not re-pin windows whose apps/windows no longer exist.
- Re-pinning should be idempotent and safe to run at multiple points (launch,
  refresh, app-activation).

---

## 11. Permissions

Top requires Accessibility permission to control other apps' windows.

`AccessibilityManager`:

- `isPermissionGranted` → `AXIsProcessTrusted()`
- `requestPermission` → `AXIsProcessTrustedWithOptions([kAXTrustedCheckOptionPrompt: true])`

See `PermissionView` for onboarding UX.

Guardrails:

- Detect permission state on launch and surface `PermissionView` when missing.
- Re-check permission when the user returns to the app.
- Do not silently bypass; do not simulate the user granting permission.
- Some apps (System Settings, secure input fields) block AX access — handle
  gracefully and explain if relevant.

---

## 12. Known Window Control Limitations

Documented reality that agents must respect:

- Some apps block Accessibility (System Preferences panes, secure text input).
- Metal/OpenGL fullscreen apps may ignore level changes.
- A window must have a non-empty title to be identified.
- Pinned state resets when the pinned window closes.
- CGS window-level functions are private APIs and may change between macOS
  versions.

Never pretend a pin succeeded when these limits prevent it.

---

## 13. UI Design

Follow native macOS design principles:

- SwiftUI
- SF Symbols (menu bar icon: `pin.fill`)
- Native controls, system typography
- `MenuBarExtra` popover as the primary surface (e.g. `.frame(width: 300)`)

The popover lists all open windows grouped by application, with app icons and a
pin/unpin toggle per window, plus a visual indicator for pinned windows.

Avoid web-style UI, excessive cards, custom frameworks.

---

## 14. Settings

Current settings:

- Launch at login ✓
- Re-pin windows on app relaunch ✓

Planned settings:

- Customizable window level (above/below status bar)
- Keyboard shortcut for pin/unpin
- Excluded applications list

Keep settings minimal. Do not introduce unnecessary configuration.

---

## 15. Permissions & Privacy

- Top operates locally with no network access.
- Do NOT add a network entitlement unless a future update feature explicitly
  requires it (and then, explain why).
- Do NOT log window titles of other apps beyond what is needed for diagnostics,
  and even then prefer bundle IDs.
- Do NOT request:
  - Full Disk Access
  - Screen Recording
  - Input Monitoring
  - administrator privileges
- No telemetry by default.

---

## 16. Error Handling

Window operations can fail for many external reasons. Handle explicitly:

- CGS unavailable → return `false`; do not crash.
- Window not found → return `false`; UI should show "not found" state.
- AX failure → log via unified logging (PID, not window titles), never crash.
- Permission revoked mid-session → re-check and prompt.

Never show raw error codes as the primary message. Provide recoverable states
(e.g., "Open System Settings → Privacy → Accessibility").

---

## 17. Testing

Unit-test `TopCore`:

### PinnedWindow / AppIdentifier

- Codable round-trip
- equality/hash behavior (used as Set members)
- ISO-8601 date encoding

### PinnedWindowStore

- add drills down / dedupes
- remove
- contains
- clearAll
- persistence round-trip
- corrupt JSON on load → empty

### SettingsStore

- default values
- read/write round-trip

Rules:

- Tests must not require Accessibility permission or a live window server.
- Keep `TopCore` free of ApplicationServices/CoreGraphics imports so tests run
  headless.
- Service-level pin/unpin logic should be exercised through injectable seams
  (mock `CGSManager`/window discovery), not real window manipulation.

### Test command

```bash
swift test
```

---

## 18. Logging

Use Apple's unified logging (`import OSLog`).

Log:

- pin/unpin failures
- CGS symbol resolution failures
- AX request failures (with PID, not titles, by default)
- persistence failures

Avoid logging:

- sensitive window titles/content
- full window lists
- personal paths

---

## 19. Performance

Target:

```text
Fast startup
Low idle CPU
Low idle memory
Responsive popover
```

- Window discovery refreshes on demand. Do not enumerate all windows on a timer.
- Re-pin on launch runs once, best-effort, and must not freeze the menu bar.
- Keep persistence writes to small atomic JSON updates.

---

## 20. Build, Bundle, Release

Commands (see Makefile):

```bash
make build    # swift build -c release
make test     # swift test
make app      # Assemble Top.app bundle (+ codesign)
make icons    # Regenerate AppIcon.icns from SVG
make dmg      # Create Top-<version>.dmg
make install  # Install to /Applications
make clean    # Remove build artifacts
make dev      # Debug build + launch
```

Bundle facts:

- App name: `Top`
- Bundle ID: `io.github.hieudoanm.Top`
- Version: `0.0.1`
- Min macOS: 13 Ventura
- Frameworks linked: Cocoa, ApplicationServices, CoreGraphics
- Entitlements: `Resources/Top.entitlements`
- Info.plist: `Resources/Info.plist`

Keep `VERSION` in sync with package and release-tag conventions.

---

## 21. Agent Workflow

Before making changes:

1. Read `AGENTS.md`.
2. Read `Sources/` and extensions.
3. Decide whether the change belongs in `TopCore` or the app target.
4. Make the smallest useful change.
5. Add or update tests in `Tests/`.
6. Run `swift test`.
7. Run `make build`.
8. Check Swift concurrency and isolation warnings.
9. Verify menu-bar and permission behavior interactively with `make dev`.
10. Summarize the change.

Never rewrite working architecture without a concrete reason.

---

## 22. Definition of Done

A feature is complete when:

- The project compiles.
- Tests pass.
- The app behaves correctly on supported macOS versions (13+).
- `make app` produces a signed bundle; `make dmg` produces a DMG.
- Errors are handled explicitly; no crashes on CGS/AX unavailability.
- Accessibility labels exist.
- No new permissions beyond what the feature requires.
- No window content is transmitted anywhere.
- UI stays responsive during discovery/re-pin.

---

## 23. Roadmap Alignment

Current Roadmap phases (see `Docs/ROADMAP.md`):

- **Phase 1 — Core Pinning**: done (menu bar, AX discovery, toggle, window level
  0 ↔ 25, indicator, persistence).
- **Phase 2 — Settings**: done for launch-at-login and re-pin on relaunch;
  remaining — customizable level, keyboard shortcut, excluded apps.
- **Phase 3 — Window Management**: detect closed pinned windows, restore state
  when window reappears, pin by application, bulk unpin, multiple displays.
- **Phase 4 — Advanced Features**: pin to display, per-app rules, smart pinning,
  Accessibility audit, global shortcut.
- **Phase 5 — Polish & Distribution**: notarization, permission UX, error
  recovery, diagnostics, Sparkle auto-update.

Implement features in phase order. Do not jump ahead without reason.

---

## 24. Non-Goals

The following are explicitly outside the MVP:

- Window management / tiling
- Layouts and workspaces
- Remote control of windows
- Network or cloud pinning
- Screenshots or capture
- Global editing of other apps' windows
- Bypassing macOS security

---

## 25. Guiding Product Question

For every feature, ask:

> "Does this make it significantly easier to keep a window on top?"

If not, do not add it.

The ideal workflow:

```text
I need a window on top
        ↓
Open Top
        ↓
Click pin
        ↓
Done
```

Top should keep the window **always on top, remembered, and re-pinned** without
hiding the fact that the Accessibility permission is required.
