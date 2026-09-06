# Clipper — AI Agent Development Guide

## 1. Project Overview

**Clipper** is a minimal, local-first clipboard manager for macOS.

Clipper is a native SwiftUI menu-bar utility that keeps a searchable history of
everything you copy, so nothing you copy is ever lost. It is lightweight,
local-first, and requires no network or account.

The application exists because macOS keeps only the most recent clipboard item:

```text
Copy "hello"
Copy "world"
  → "hello" is gone
```

Clipper should make every copied item recoverable through a fast, clean, native
macOS interface.

---

## 2. Product Definition

Clipper is:

> A native macOS menu-bar clipboard history manager.

Clipper is NOT:

- A cloud sync service.
- A team collaboration tool.
- A password manager.
- A clipboard automation/rule engine (yet).
- A snippet manager.
- A networked service.
- A replacement for the system clipboard.

**NSPasteboard remains the source of truth.**

Clipper observes the system clipboard and keeps local history. It must never
pretend to own the clipboard.

---

## 3. Product Principles

### 3.1 Local-first

All history lives on-device.

Do NOT transmit clipboard contents anywhere unless the user explicitly chooses a
future opt-in sync feature.

Do NOT implement telemetry by default.

### 3.2 Native macOS application

Use native macOS technologies:

```text
Swift
SwiftUI
AppKit
Foundation
Combine
Swift Concurrency
Swift Package Manager
```

Do NOT use:

- Electron
- Tauri
- React
- WebView-based UI
- JavaScript runtimes

The application should feel like a first-class macOS utility.

### 3.3 Lightweight

Clipper should be lighter than an Electron-based clipboard manager.

Priorities:

1. Fast startup.
2. Low idle CPU usage.
3. Low memory usage.
4. No unnecessary background processes.
5. No network services.
6. No telemetry by default.

### 3.4 System clipboard compatibility

Anything Clipper does must remain compatible with normal system clipboard
behavior.

Clipper must NOT:

- intercept copies it should not
- block the system clipboard
- require the user to open the app to copy normally

### 3.5 Menu-bar accessory

Clipper runs as a menu-bar accessory (`NSApp.setActivationPolicy(.accessory)`).
It has no Dock icon and should not claim the Cmd+Tab focus.

---

## 4. Target Users

Primary users:

- macOS developers
- Writers and note-takers
- Students
- Power users
- Anyone who copies frequently

Primary use cases:

```text
Copy something
        ↓
Clip it to history
        ↓
Search history later
        ↓
One-click copy again
```

---

## 5. Architecture

Actual sources:

```text
Sources/
├── App/
│   ├── ClipperApp.swift        # App + MenuBarExtra + windows entry point
│   └── ClipperViewModel.swift  # Main view model
├── Core/
│   └── Models/
│       ├── ClipperItem.swift   # Clipboard item model
│       └── ClipperStore.swift  # History store + persistence
├── Persistence/                # (reserved for dedicated persistence helpers)
├── Services/
│   ├── PasteboardManager.swift # NSPasteboard access
│   └── ClipboardMonitor.swift  # Change detection (polling)
└── Views/
    ├── MenuBarView.swift       # Menu bar popover
    ├── HistoryView.swift       # Clipboard history list
    └── SettingsView.swift      # Settings window
```

SPM targets:

| Target         | Path           | Notes                       |
| -------------- | -------------- | --------------------------- |
| `ClipperCore`  | `Sources/Core` | UI-independent models/store |
| `Clipper`      | `Sources`      | Executable, links Cocoa     |
| `ClipperTests` | `Tests`        | Tests `ClipperCore`         |

Maintain separation between layers:

```text
Views (SwiftUI)
    ↓
ViewModel
    ↓
Services (ClipboardMonitor / PasteboardManager)
    ↓
Core Models (ClipperStore)
```

Views must not talk to `NSPasteboard` directly. UI-independent logic belongs in
`ClipperCore` so it can be unit-tested without a real pasteboard.

---

## 6. Clipboard Monitoring

Clipper currently detects clipboard changes by polling:

```swift
Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true)
```

- `PasteboardManager` compares `NSPasteboard.general.changeCount` between ticks.
- `ClipboardMonitor` calls `store.add(...)` when new content is detected.
- The store deduplicates repeated copies.

Guardrails:

- Keep the poll interval reasonable. Do not hammer the pasteboard.
- Never read clipboard content synchronously on the main thread except for the
  small current-item check.
- `changeCount` is authoritative for "did the clipboard change".

---

## 7. Pasteboard Access

`PasteboardManager` is the single access point to `NSPasteboard.general`.

Operations:

- `hasNewContent` — is there new content since last check.
- `getLatestContent() -> String?` — read text content.
- `copyToClipboard(_ content: String)` — write back to the clipboard.

Guardrails:

- Do not write to the pasteboard during an in-app copy in a way that triggers a
  feedback loop (copy → monitor sees new changeCount → pushes duplicate).
- If a user copies an item from history, Clipper should be able to distinguish
  its own write from an external copy where needed.

---

## 8. History Model

`ClipperItem` fields:

```swift
id: UUID
content: String
contentType: ContentType  // .text, .image, .file
pinned: Bool
createdAt: Date
copiedCount: Int
```

`ContentType` enum exists but only `.text` is fully implemented today.

Rules:

- Do not store empty content.
- Repeated copies should bump `copiedCount` and move the item to the front
  rather than inserting duplicates.
- Pinned items must survive operations like "clear unpinned" and the future max
  history cap.

---

## 9. History Store

`ClipperStore` (in `ClipperCore`) owns persistence:

- Storage: `~/Library/Application Support/Clipper/clipboard.json`
- Format: Codable JSON (ISO-8601 dates)
- Loaded at init, saved atomically on every mutation.

Exposed operations:

```swift
add(_ content: String, type: ContentType)
delete(_ item: ClipperItem)
togglePin(_ item: ClipperItem)
clearUnpinned()
search(_ query: String) -> [ClipperItem]
```

Guardrails:

- `ClipperStore` must not depend on AppKit/SwiftUI. Keep it in `ClipperCore`.
- All mutations persist. A crash must not lose committed history.
- Do not silently cap/truncate history unless a setting is explicitly configured
  (the "Maximum history items" setting is a future feature).
- Corrupt JSON on load must degrade to an empty history, not crash.

---

## 10. Search

`search(_ query:)` matches item content case-insensitively.

Rules:

- Empty query returns all items.
- Search must remain instant for realistic history sizes.
- Do not perform a search on every keystroke without throttling once results
  need to be served from larger datasets.

---

## 11. Pin & Organize

Pinning marks an item as important.

- Pinned items should be visually distinct.
- "Clear history" must not remove pinned items without confirmation.
- Deduplication should not unpin existing copies.

Future organization:

- delete individual items ✓ (store supports it)
- clear history
- sort by date/type

---

## 12. Settings

The Settings window (SwiftUI `Settings` scene + a dedicated `settings` window)
currently supports:

- Launch at login ✓

Planned settings:

- Maximum history items
- Global shortcut (Cmd+Shift+C)
- Shortcut customization UI

Keep settings minimal. Do not introduce unnecessary configuration.

---

## 13. UI Design

Follow native macOS design principles:

- SwiftUI
- SF Symbols, native controls, system typography
- `MenuBarExtra` popover as the primary surface
- Standard window behavior for History and Settings

Avoid:

- web-style dashboards
- excessive cards
- custom UI frameworks
- fake macOS controls

---

## 14. Menu Bar

Clipper runs from the menu bar with:

- `MenuBarExtra` styled `.window` (popover)
- Label icon: `doc.on.clipboard`

The popover shows the recent history and entry points for History and Settings.

Do not duplicate the entire application in the menu bar.

---

## 15. Windows

Clipper may open:

- `history` window (Clipboard History, e.g. 450×500)
- `settings` window (Clipper Settings, e.g. 400×350)

The app must not terminate after the last window closes
(`applicationShouldTerminateAfterLastWindowClosed → false`).

---

## 16. Accessibility

All interactive controls must have meaningful accessibility labels.

Examples:

```text
"Copy item"
"Pin item"
"Delete item"
"Search clipboard history"
```

Do not rely solely on icons. Support VoiceOver and keyboard navigation.

---

## 17. Error Handling

Handle pasteboard and persistence failures explicitly:

- If the pasteboard cannot be read, skip the tick silently (do not crash).
- If persistence fails, surface a recoverable state rather than losing data
  silently.
- Never show raw Foundation exceptions to users.

Where a future copy-back fails, the UI should make it obvious and retryable.

---

## 18. Privacy & Security

This is a critical product boundary.

- Clipboard contents can be sensitive (passwords, secrets, personal data).
- Store history only locally.
- Do NOT log clipboard contents to unified logging by default.
- Do NOT transmit clipboard contents to any network destination.
- Do NOT add a network entitlement "just in case."
- When displaying history, consider content masking settings later (e.g., hide
  contents for sensitive items) as an opt-in feature.
- Do NOT silently sync (iCloud sync must remain an explicit opt-in future
  feature).

---

## 19. Performance

Target:

```text
Fast startup
Low idle CPU
Low idle memory
Responsive UI
Non-blocking file I/O where possible
```

- The 0.5 s polling timer must stay lightweight.
- Persistence writes happen on small, atomic JSON updates — keep them small.
- Do not rebuild the entire UI on every pasteboard tick.

---

## 20. Testing

Unit-test `ClipperCore`:

### ClipperStore

- add text
- dedupe repeated copies (increment `copiedCount`, move to front, no duplicate)
- delete
- toggle pin
- clearUnpinned keeps pinned items
- search (case-insensitive, empty query, no match)
- persistence round-trip (init → add → new store load)
- corrupt JSON on load → empty history

### ClipperItem

- defaults (`pinned == false`, `createdAt` set, `copiedCount == 1`)
- Codable round-trip

Rules:

- Tests must not require a real pasteboard (`NSPasteboard`) — inject or mock.
- Keep `ClipperCore` free of AppKit/SwiftUI dependencies so tests run headless.

### Test command

```bash
swift test
```

---

## 21. Logging

Use Apple's unified logging (`import OSLog`).

Log:

- pasteboard read failures (frequency, not content)
- persistence failures
- unusual store states

Avoid logging:

- clipboard contents
- secrets
- full JSON dumps of history

---

## 22. Build, Bundle, Release

Commands (see Makefile):

```bash
make build    # swift build -c release
make test     # swift test
make app      # Assemble Clipper.app bundle (+ codesign)
make icons    # Regenerate AppIcon.icns from SVG
make dmg      # Create Clipper-<version>.dmg
make install  # Install to /Applications
make clean    # Remove build artifacts
make dev      # Debug build + launch
```

Bundle facts:

- App name: `Clipper`
- Bundle ID: `io.github.hieudoanm.Clipper`
- Version: `0.0.1`
- Min macOS: 13 Ventura
- Entitlements: `Resources/Clipper.entitlements`
- Info.plist: `Resources/Info.plist`

Do not bump the bundle version casually; keep it in sync with the Makefile
`VERSION` and release tag conventions.

---

## 23. Agent Workflow

Before making changes:

1. Read `AGENTS.md`.
2. Read `Sources/` and `Tests/` to understand current state.
3. Keep UI-independent logic in `ClipperCore`.
4. Make the smallest useful change.
5. Add or update tests in `Tests/`.
6. Run `swift test`.
7. Run `make build`.
8. Check Swift concurrency and isolation warnings.
9. Verify menu-bar behavior interactively with `make dev`.
10. Summarize the change.

Never rewrite working architecture without a concrete reason.

---

## 24. Definition of Done

A feature is complete when:

- The project compiles.
- Tests pass.
- The app behaves correctly on supported macOS versions (13+).
- Generated artifact (`make dmg`) builds.
- Errors are handled explicitly.
- Accessibility labels exist.
- No clipboard content is transmitted anywhere.
- No unnecessary permissions or entitlements are added.
- UI remains responsive while the app monitors the clipboard.

---

## 25. Roadmap Alignment

Current Roadmap phases (see `Docs/ROADMAP.md`):

- **Phase 1 — Core Clipboard**: done (menu bar, change detection, text history,
  one-click copy, popover).
- **Phase 2 — Clipboard Types**: images, files, rich text, filtering, preview.
- **Phase 3 — Search & Organization**: search, pin, delete, clear, sort.
- **Phase 4 — Settings & Shortcuts**: max items, global shortcut.
- **Phase 5 — Advanced Features**: iCloud sync (optional), rules, export/import.
- **Phase 6 — Polish & Distribution**: DMG, notarization, App Store.

Implement features in phase order. Do not jump ahead without reason.

---

## 26. Non-Goals

The following are explicitly outside the MVP:

- Team collaboration
- Cloud/network clipboard by default
- Password/secret storage semantics
- Automatic clipboard editing
- Data mining of user history
- Aggressive clipboard interception
- Replacing the system clipboard

---

## 27. Guiding Product Question

For every feature, ask:

> "Does this make it significantly easier to find something you copied?"

If not, do not add it.

The ideal workflow:

```text
I copied something
        ↓
Open Clipper
        ↓
Search
        ↓
One click
        ↓
Pasted
```

Clipper should make the clipboard **visible, searchable, and local** without
hiding the fact that the system pasteboard remains the actual source of truth.
