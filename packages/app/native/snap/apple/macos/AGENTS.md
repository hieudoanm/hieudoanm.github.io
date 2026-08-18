# Snap

Native macOS utility for **window snapping, saved workspace layouts, and workspace restoration**.

## 1. Product Concept

**Snap** combines two core capabilities:

1. **Window snapping**
   - Snap windows into predefined or custom zones.
   - Quickly arrange windows on one or multiple monitors.
   - Support keyboard-driven window placement.

2. **Saved workspace restoration**
   - Save the current window arrangement as a named workspace.
   - Restore a saved workspace later.
   - Reopen/reposition applications and windows when possible.
   - Adapt saved layouts to different monitor resolutions and configurations.

### Core mental model

```text
Snap
  ↓
Arrange
  ↓
Save Snap
  ↓
Restore Snap
```

Example:

```text
Development

┌──────────────────────┬──────────────┐
│                      │              │
│       VS Code        │   Browser    │
│                      │              │
├──────────────────────┼──────────────┤
│       Terminal       │    Slack     │
│                      │              │
└──────────────────────┴──────────────┘
```

The user can save this as:

```text
Development
```

and restore it later.

---

# 2. Platform

**Target platform:** macOS

Snap should be a **native macOS application**.

Do not use Tauri, React, Electron, or Next.js.

The application should prioritize:

- Native macOS behavior
- Low resource usage
- Small application footprint
- Fast startup
- Native permissions
- Native menu-bar integration
- Native keyboard shortcuts
- Native Accessibility integration

---

# 3. Technology Stack

## Core

- **Swift**
- **SwiftUI**
- **AppKit**
- **CoreGraphics**
- **Accessibility API**
- **NSWorkspace**
- **NSScreen**

## Persistence

Start with:

- `Codable`
- JSON files
- `FileManager`

Do **not** introduce a database unless the requirements eventually justify it.

Suggested storage:

```text
~/Library/Application Support/Snap/
├── layouts.json
└── settings.json
```

## Architecture

```text
                    Snap
                      │
                ┌─────┴─────┐
                │            │
            SwiftUI        AppKit
                │            │
                └─────┬──────┘
                      │
             ┌────────┴────────┐
             │                 │
       Accessibility       CoreGraphics
             │                 │
             └────────┬────────┘
                      │
                 macOS Windows
                      │
                  NSWorkspace
```

---

# 4. UI Technology

Use **SwiftUI** for:

- Main application window
- Saved workspace list
- Workspace editor
- Settings
- Menu-bar popover
- Onboarding
- Permission screens

Use **AppKit** where SwiftUI does not provide sufficient control over macOS-specific functionality.

Do not create a web-based UI.

---

# 5. Window Management

Window management is the core technical component.

Snap needs to:

1. Discover running applications.
2. Discover application windows.
3. Identify applications by bundle identifier.
4. Read window titles.
5. Read current window positions.
6. Read current window sizes.
7. Move windows.
8. Resize windows.
9. Determine which monitor contains a window.
10. Detect monitor configuration changes.
11. Detect application launches and termination.

---

# 6. macOS APIs

## Accessibility API

Use the Accessibility API for controlling application windows.

Important concepts:

```text
AXUIElement
kAXWindowsAttribute
kAXPositionAttribute
kAXSizeAttribute
kAXTitleAttribute
kAXRoleAttribute
kAXSubroleAttribute
```

The Accessibility API is responsible for operations such as:

```text
Get window
Get window position
Get window size
Set window position
Set window size
Get window title
```

Snap will require the appropriate macOS Accessibility permission.

---

## CoreGraphics

Use CoreGraphics primarily for window discovery and screen information.

Relevant APIs include:

```text
CGWindowListCopyWindowInfo
CGWindowListCreate
CGDisplayBounds
```

CoreGraphics can provide:

```text
Window ID
Process ID
Owner application
Window bounds
Window layer
```

Use CoreGraphics and Accessibility together rather than relying exclusively on either API.

---

## NSWorkspace

Use `NSWorkspace` / `NSRunningApplication` for application lifecycle and identification.

Snap should be able to determine:

```text
Application name
Bundle identifier
Process identifier
Running state
Launch state
Termination state
```

This is important for workspace restoration.

---

## NSScreen

Use `NSScreen` for monitor information.

Snap should track:

```text
Screen identifier
Screen snap
Visible snap
Resolution
Scale factor
Screen arrangement
Primary display
```

Do not assume a fixed number of monitors.

---

# 7. Data Model

Keep the data model simple.

## SnapLayout

```swift
struct SnapLayout: Codable, Identifiable {
    let id: UUID
    var name: String
    var windows: [WindowRule]
}
```

## WindowRule

```swift
struct WindowRule: Codable {
    var bundleIdentifier: String
    var title: String?
    var zone: CGRect
}
```

The exact model can evolve.

---

# 8. Normalized Coordinates

Do **not** primarily save absolute pixel coordinates.

Avoid:

```json
{
  "x": 124,
  "y": 53,
  "width": 1200,
  "height": 900
}
```

Prefer normalized coordinates:

```json
{
  "x": 0,
  "y": 0,
  "width": 0.66,
  "height": 1
}
```

This allows Snap to adapt layouts to:

- Different monitor resolutions
- Retina displays
- Different aspect ratios
- Different monitor configurations
- Laptop-only mode
- External monitor setups

Snap should calculate actual window coordinates from the target screen at restoration time.

---

# 9. Layout Zones

A layout should be represented as zones.

Example:

```text
Development

┌──────────────────────┬──────────────┐
│                      │              │
│       Main           │     Top      │
│                      │              │
├──────────────────────┼──────────────┤
│       Bottom         │    Right     │
│                      │              │
└──────────────────────┴──────────────┘
```

A window is assigned to a zone:

```text
VS Code   → Main
Chrome    → Top
Terminal  → Bottom
Slack     → Right
```

The same zone system should power both:

- Live snapping
- Saved workspace restoration

Avoid implementing snapping and restoration as two unrelated systems.

---

# 10. Window Matching

When restoring a workspace, Snap needs to match saved rules against currently running windows.

Primary identifier:

```text
bundleIdentifier
```

Example:

```text
com.microsoft.VSCode
com.google.Chrome
com.apple.Terminal
```

If multiple windows belong to the same application, use additional information where possible:

```text
Bundle ID
+
Window title
+
Window ordering
+
Previously stored window metadata
```

The matching algorithm should be tolerant of changing window titles.

Do not make exact window-title matching mandatory.

---

# 11. Workspace Restoration

Restoration should work approximately as follows:

```text
Restore "Development"
        ↓
Read saved layout
        ↓
Detect monitors
        ↓
Detect running applications
        ↓
Match saved windows
        ↓
Launch missing applications if configured
        ↓
Wait for application/window availability
        ↓
Calculate target zones
        ↓
Move windows
        ↓
Resize windows
        ↓
Verify final positions
```

Restoration should be asynchronous.

Applications may take time to launch and create their windows.

---

# 12. Missing Applications

A workspace may contain applications that are not currently running.

Example:

```text
Development
├── VS Code
├── Chrome
├── Terminal
└── Slack
```

If Slack isn't running, Snap should support a configurable behavior:

```text
Ignore
Ask
Launch automatically
```

Default behavior for MVP:

```text
If application isn't running:
    Ignore it
```

Avoid automatically launching applications until this behavior is explicitly implemented and configurable.

---

# 13. Multi-Monitor Support

Multi-monitor support should be considered part of the architecture from the beginning.

Do not assume:

```text
One Mac
One monitor
```

A saved workspace may look like:

```text
Monitor 1
┌─────────────────────────┐
│ VS Code                 │
│                         │
└─────────────────────────┘

Monitor 2
┌──────────────┬──────────┐
│ Browser      │ Slack    │
│              │          │
└──────────────┴──────────┘
```

The layout model should therefore associate zones with displays.

Prefer stable display identifiers where possible rather than relying only on display ordering.

If a saved monitor is unavailable:

1. Detect the missing display.
2. Apply a fallback strategy.
3. Avoid placing windows off-screen.

---

# 14. Snapping

The MVP should support common snapping actions:

```text
Left Half
Right Half
Top Half
Bottom Half

Top Left
Top Right
Bottom Left
Bottom Right

Maximize
Center
```

Later support:

```text
Custom zones
Custom grids
User-defined layouts
```

Keyboard shortcuts should be configurable.

---

# 15. Saved Workspaces

The menu-bar interface should make saved workspaces immediately accessible.

Example:

```text
Snap

Workspaces
──────────────
Development
Research
Writing
Meeting

──────────────
Save Current Layout
Edit Workspaces
Settings
Quit
```

Selecting:

```text
Development
```

should restore that workspace.

---

# 16. Keyboard Shortcuts

Support global shortcuts such as:

```text
⌘ ⇧ 1    Restore Development
⌘ ⇧ 2    Restore Research
⌘ ⇧ 3    Restore Meeting

⌘ ⇧ S    Save Current Layout
```

Do not hard-code shortcuts permanently.

Users should be able to configure them.

Global shortcut implementation should use native macOS functionality or a small dedicated Swift implementation.

---

# 17. Menu Bar Application

Snap should primarily behave as a menu-bar utility.

Expected flow:

```text
macOS Menu Bar
       │
       ▼
      Snap
       │
       ▼
┌──────────────────────┐
│ Development          │
│ Research             │
│ Meeting              │
├──────────────────────┤
│ Save Current Layout  │
│ Settings             │
│ Quit                 │
└──────────────────────┘
```

Avoid requiring the user to keep a large main window open.

---

# 18. Suggested Project Structure

```text
Snap/
├── Snap.xcodeproj
│
├── Snap/
│   ├── App/
│   │   └── SnapApp.swift
│   │
│   ├── Models/
│   │   ├── SnapLayout.swift
│   │   ├── WindowRule.swift
│   │   ├── Zone.swift
│   │   └── Monitor.swift
│   │
│   ├── Services/
│   │   ├── WindowManager.swift
│   │   ├── WindowDiscovery.swift
│   │   ├── LayoutManager.swift
│   │   ├── WorkspaceManager.swift
│   │   ├── ApplicationManager.swift
│   │   └── ShortcutManager.swift
│   │
│   ├── macOS/
│   │   ├── AccessibilityManager.swift
│   │   ├── CoreGraphicsManager.swift
│   │   ├── ScreenManager.swift
│   │   └── WorkspaceMonitor.swift
│   │
│   ├── Persistence/
│   │   ├── LayoutStore.swift
│   │   └── SettingsStore.swift
│   │
│   └── Views/
│       ├── MenuBarView.swift
│       ├── LayoutListView.swift
│       ├── LayoutEditorView.swift
│       ├── SettingsView.swift
│       └── PermissionView.swift
│
└── README.md
```

---

# 19. MVP

The first version should remain small.

## MVP Features

- [ ] Menu-bar application
- [ ] Accessibility permission onboarding
- [ ] Discover current windows
- [ ] Move and resize windows
- [ ] Left/right/quarter snapping
- [ ] Save current window layout
- [ ] Name saved layouts
- [ ] List saved layouts
- [ ] Restore saved layouts
- [ ] Basic multi-monitor support
- [ ] Configurable global shortcuts
- [ ] JSON persistence

## Do not include initially

- [ ] Cloud synchronization
- [ ] iCloud
- [ ] Accounts
- [ ] Backend
- [ ] Analytics
- [ ] AI
- [ ] Complex automation
- [ ] Plugin system
- [ ] Team collaboration
- [ ] Subscription system

Snap should remain a **small local-first utility**.

---

# 20. Future Features

After the MVP is stable:

### Advanced snapping

```text
Custom grids
Custom zones
Drag-to-zone
Zone previews
```

### Workspace automation

```text
Auto-restore on login
Auto-restore when monitor connects
Auto-restore when application launches
```

### Application rules

```text
VS Code → Main
Chrome → Right
Terminal → Bottom
Slack → Monitor 2
```

### Workspace profiles

```text
Development
Research
Writing
Meeting
Gaming
```

### Advanced restoration

```text
Launch missing applications
Wait for windows
Restore minimized windows
Restore fullscreen state
Restore window focus
```

---

# 21. Design Principles

## Native first

Use native macOS APIs wherever possible.

## Local first

All workspace information stays on the user's machine.

## Minimal

Snap should solve one problem extremely well:

> **Put my windows where I want them and let me get that arrangement back later.**

## Fast

Restoring a workspace should feel instantaneous, even when applications need to launch.

## Non-destructive

Never unexpectedly close applications or windows.

## Resolution independent

Layouts should work across different monitor sizes.

## Multi-monitor aware

Monitor configuration changes must not break saved layouts.

## Permission transparent

Explain clearly why Accessibility permission is required and what Snap uses it for.

---

# 22. Product Definition

### Name

**Snap**

### Category

Primary:

**Productivity**

Secondary:

**Utilities**

### Positioning

> **Snap your workspace. Restore it anytime.**

### Core functionality

```text
Snap windows
     ↓
Arrange workspace
     ↓
Save Snap
     ↓
Switch tasks
     ↓
Restore Snap
```

### Technology decision

**Native Swift + SwiftUI + AppKit + Accessibility + CoreGraphics + NSWorkspace + JSON persistence.**

No backend. No web UI. No Tauri for the native version.
