# Mixer

## Project Overview

**Mixer** is a native macOS per-application volume mixer.

It provides a simple interface for controlling the audio volume of individual applications, similar to the Windows Volume Mixer.

### Core concept

```text
Mixer
│
├── Discover applications producing audio
├── Show each application's volume
├── Adjust volume independently
├── Mute/unmute individual applications
└── Provide quick access from the menu bar
```

Example:

```text
┌──────────────────────────────┐
│ Mixer                          │
├──────────────────────────────┤
│                              │
│ Chrome        ━━━━━━━━  80%  │
│ Spotify       ━━━━━━    60%  │
│ Discord       ━━━       30%  │
│ VS Code       ━━━━━━━━━ 100% │
│                              │
└──────────────────────────────┘
```

The application should remain a **small, native, local-first macOS utility**.

---

# 1. Product Goals

## Primary goals

1. Control audio volume per application.
2. Display currently active audio applications.
3. Mute/unmute individual applications.
4. Provide a fast menu-bar interface.
5. Support keyboard shortcuts where useful.
6. Require no backend or account.
7. Feel like a native macOS utility.
8. Use minimal CPU and memory.

## Non-goals for MVP

Do not build:

- Cloud synchronization
- User accounts
- Backend services
- Social features
- AI
- Music library management
- Audio recording
- Full DAW functionality
- Audio editing
- Complex effects
- Equalizers
- Virtual audio routing
- Subscription system

The product should remain focused on:

> **Controlling the volume of individual applications.**

---

# 2. Platform

Target:

```text
macOS
```

This is a **native macOS application**.

Do not use:

- Electron
- Tauri
- React
- Next.js
- WebView-based UI

The application should use native Apple frameworks.

---

# 3. Technology Stack

## Language

```text
Swift
```

Use modern Swift concurrency where appropriate.

## UI

```text
SwiftUI
```

Use SwiftUI for:

- Menu-bar popover
- Application list
- Volume sliders
- Settings
- Onboarding
- Permission UI

Use AppKit when necessary for macOS-specific behavior.

## Audio

Investigate and use the appropriate native macOS Core Audio APIs.

Primary technologies to investigate:

```text
Core Audio
AudioToolbox
CoreAudio
AVFoundation
```

The implementation must determine the correct supported macOS mechanism for **per-process/application output volume**.

Do not assume that `AVAudioSession` or other iOS APIs provide the required functionality on macOS.

## System integration

Use:

```text
AppKit
Core Audio
NSWorkspace
NSScreen
UserNotifications
```

as appropriate.

---

# 4. Important Technical Requirement

The most important technical question for Mixer is:

> **Can macOS reliably control the output volume of an individual application's audio stream/process using supported APIs?**

Do not begin by assuming that macOS exposes a Windows-style per-process volume API.

Investigate:

```text
AudioObject
AudioDevice
AudioStream
AudioProcess
AudioHardware
Core Audio process objects
```

Determine:

1. How applications expose audio streams.
2. How to identify the process producing audio.
3. How to obtain the corresponding audio object.
4. Whether output volume can be controlled per process.
5. Whether muting can be controlled per process.
6. Whether the functionality requires third-party virtual audio drivers.
7. Whether the behavior differs between Intel and Apple Silicon Macs.
8. Which macOS versions support the required APIs.
9. Which APIs are public and supported.
10. Whether App Store distribution is possible without additional drivers or entitlements.

If the desired functionality is impossible using public macOS APIs, document the limitation before changing the architecture.

---

# 5. Architecture

Prefer a simple layered architecture:

```text
Mixer
│
├── App
│   └── MixApp.swift
│
├── Models
│   ├── AudioApplication.swift
│   ├── VolumeState.swift
│   └── AudioDevice.swift
│
├── Services
│   ├── AudioManager.swift
│   ├── ApplicationManager.swift
│   └── ShortcutManager.swift
│
├── Audio
│   ├── CoreAudioManager.swift
│   ├── AudioProcessDiscovery.swift
│   └── AudioVolumeController.swift
│
├── Persistence
│   └── SettingsStore.swift
│
└── Views
    ├── MenuBarView.swift
    ├── ApplicationVolumeView.swift
    ├── SettingsView.swift
    └── PermissionView.swift
```

Keep platform-specific implementation isolated from UI code.

---

# 6. Data Model

A minimal application model:

```swift
struct AudioApplication: Identifiable {
    let id: String
    let processID: pid_t
    let bundleIdentifier: String?
    let name: String
    var volume: Float
    var isMuted: Bool
    var isPlaying: Bool
}
```

The exact model can change based on what Core Audio actually exposes.

Do not persist process IDs as permanent identifiers.

PIDs can change whenever an application restarts.

Prefer:

```text
bundleIdentifier
```

as the stable application identity.

---

# 7. Application Discovery

Mixer should detect applications that are currently producing audio.

Potential information:

```text
Application name
Bundle identifier
Process ID
Audio activity
Volume
Mute state
```

Example:

```text
Chrome
Spotify
Discord
Slack
VS Code
QuickTime Player
```

Do not display every running application by default.

The primary list should represent applications that have an audio stream or are otherwise relevant to the mixerer.

---

# 8. Audio Activity

The UI should distinguish between:

```text
Active audio application
Inactive application
Muted application
```

Example:

```text
Chrome        ● 80%
Spotify       ● 60%
Discord       ○ 30%
```

Where:

```text
● = currently producing audio
○ = not currently producing audio
```

The exact visual treatment is flexible.

---

# 9. Volume Control

The primary interaction is a slider.

Example:

```text
Chrome

━━━━━━━●──────
       70%
```

Requirements:

- Drag slider.
- Update volume immediately.
- Display current volume.
- Support 0–100% logical volume.
- Support mute.
- Avoid unnecessary polling.
- Avoid excessive Core Audio calls.

Volume changes should feel instantaneous.

---

# 10. Mute

Each application should have an independent mute control.

Example:

```text
Spotify       🔊  ━━━━━━━ 70%
Discord       🔇  ━━      20%
```

Mute should not necessarily overwrite the stored volume.

For example:

```text
Before mute:
Spotify = 70%

Mute:
Spotify = muted

Unmute:
Spotify = 70%
```

---

# 11. Menu Bar

Mixer should primarily be a menu-bar application.

Expected interaction:

```text
macOS Menu Bar
      │
      ▼
     Mixer
      │
      ▼
┌─────────────────────────┐
│ Mixer                     │
├─────────────────────────┤
│ Chrome       ━━━━━ 80%  │
│ Spotify      ━━━━  60%  │
│ Discord      ━━    30%  │
│                         │
├─────────────────────────┤
│ Settings                │
│ Quit Mixer                │
└─────────────────────────┘
```

The user should not need to open a full application window for normal usage.

---

# 12. Menu Bar Icon

Use a native SF Symbol or simple custom symbol representing audio.

Possible symbols:

```text
speaker.wave.2
speaker.wave.3
slider.horizontal.3
```

Do not create an elaborate custom icon for MVP.

The menu-bar icon should communicate:

> "Audio controls are available here."

---

# 13. Settings

MVP settings should remain minimal.

Possible settings:

```text
Launch at login        [ON/OFF]

Show inactive apps     [ON/OFF]

Remember volumes       [ON/OFF]

Global shortcut        [⌘ ⇧ M]
```

Do not add settings unless they solve a real problem.

---

# 14. Volume Persistence

Application volume persistence is optional for MVP.

If implemented, store preferences by:

```text
Bundle Identifier
```

Example:

```json
{
  "com.spotify.client": {
    "volume": 0.6
  },
  "com.google.Chrome": {
    "volume": 0.8
  }
}
```

Do not store PIDs.

PIDs are ephemeral.

---

# 15. Application Lifecycle

Applications may:

```text
Launch
Terminate
Start playing audio
Stop playing audio
Change audio streams
```

Mixer should respond appropriately.

Avoid aggressive polling.

Prefer event-driven Core Audio APIs where possible.

If polling is unavoidable:

- Keep the interval reasonable.
- Stop unnecessary work when the menu is closed.
- Avoid keeping the CPU awake unnecessarily.

---

# 16. Audio Device Changes

Users may switch between:

```text
MacBook Speakers
AirPods
USB DAC
External Monitor
HDMI
Bluetooth headphones
```

Mixer should handle output-device changes gracefully.

The application should detect when the default output device changes.

Do not assume:

```text
Built-in speakers
```

are always the active output.

---

# 17. Multi-Output Considerations

Do not over-engineer this for MVP.

Initially support the system's primary/default output device.

Document limitations around:

- Multiple simultaneous output devices
- Aggregate devices
- Multi-output devices
- Virtual audio devices

Support these later only if the underlying Core Audio model permits reliable control.

---

# 18. Permission Handling

If Mixer requires any macOS permission, onboarding must clearly explain:

```text
Why permission is needed
What Mixer can access
How to enable it
```

Never request permissions without a clear user-facing explanation.

Do not request unrelated permissions.

---

# 19. Performance

Mixer is expected to be a lightweight menu-bar utility.

Targets:

```text
Low idle CPU
Low memory usage
Fast startup
No unnecessary background polling
No network traffic
```

Do not introduce large dependencies.

---

# 20. Persistence

Use simple local storage.

Preferred initial implementation:

```text
~/Library/Application Support/Mixer/
└── settings.json
```

Use:

```swift
Codable
FileManager
```

Do not introduce SQLite or SwiftData for the MVP.

---

# 21. Keyboard Shortcuts

Potential shortcut:

```text
⌘ ⇧ M
```

Open Mixer.

Future:

```text
⌘ ⇧ ↑
Increase selected application volume

⌘ ⇧ ↓
Decrease selected application volume
```

Global shortcuts are optional for MVP.

Do not allow shortcuts to conflict with common macOS shortcuts by default.

---

# 22. UI Principles

Mixer should feel like a native macOS utility.

Prefer:

- SwiftUI controls
- Native typography
- SF Symbols
- Native menus
- Native sliders
- Native toggles
- Native spacing
- Native animations

Avoid:

- Web-style dashboards
- Excessive cards
- Large gradients
- Excessive rounded containers
- Custom UI frameworks
- Unnecessary animations

The interface should be compact and information-dense.

---

# 23. MVP UI

The first usable version can be just:

```text
┌────────────────────────────┐
│ Mixer                    ⚙︎  │
├────────────────────────────┤
│                            │
│ 🔊 Chrome       ━━━━━ 80%  │
│ 🔊 Spotify      ━━━━  60%  │
│ 🔇 Discord      ━━    30%  │
│                            │
└────────────────────────────┘
```

Required interactions:

```text
Slider → change application volume

Mute → mute application

Menu bar → open mixer

Quit → terminate application
```

Everything else can come later.

---

# 24. Suggested Project Structure

```text
Mixer/
├── Mixer.xcodeproj
│
├── Mixer/
│   ├── App/
│   │   └── MixApp.swift
│   │
│   ├── Models/
│   │   ├── AudioApplication.swift
│   │   ├── AudioDevice.swift
│   │   └── VolumeState.swift
│   │
│   ├── Audio/
│   │   ├── CoreAudioManager.swift
│   │   ├── AudioProcessDiscovery.swift
│   │   └── AudioVolumeController.swift
│   │
│   ├── Services/
│   │   ├── ApplicationManager.swift
│   │   ├── SettingsManager.swift
│   │   └── ShortcutManager.swift
│   │
│   ├── Persistence/
│   │   └── SettingsStore.swift
│   │
│   ├── Views/
│   │   ├── MenuBarView.swift
│   │   ├── AudioApplicationRow.swift
│   │   ├── SettingsView.swift
│   │   └── PermissionView.swift
│   │
│   └── Resources/
│
├── Tests/
│   ├── MixTests/
│   └── AudioTests/
│
└── AGENTS.md
```

---

# 25. Development Order

Agents should implement the project in this order.

## Phase 1 — Technical feasibility

Before building the UI:

1. Create a minimal native Swift macOS application.
2. Enumerate audio-related Core Audio objects.
3. Determine how audio-producing applications are identified.
4. Determine whether per-process volume can be controlled through public APIs.
5. Implement a command-line or minimal UI prototype.
6. Test on Apple Silicon.
7. Test with:
   - Safari/Chrome
   - Spotify
   - Discord
   - Terminal
   - QuickTime
8. Document limitations.

**Do not proceed to polished UI until per-application volume control is proven.**

---

## Phase 2 — Audio engine

Implement:

```text
AudioProcessDiscovery
AudioVolumeController
AudioDevice detection
Mute/unmute
Audio activity detection
```

The audio engine must not depend on SwiftUI.

---

## Phase 3 — Menu bar UI

Implement:

```text
Menu-bar icon
Application list
Volume sliders
Mute controls
Refresh/activity state
```

---

## Phase 4 — Persistence

Implement:

```text
Settings
Remembered volumes
Launch-at-login preference
```

Only persist features that have been implemented and tested.

---

## Phase 5 — Shortcuts

Add global shortcut support.

---

## Phase 6 — Polish

Add:

- Native animations
- Empty states
- Error states
- Permission onboarding
- Output-device handling
- Accessibility
- Keyboard navigation

---

# 26. Testing

Test at minimum:

### Applications

- Safari
- Google Chrome
- Spotify
- Discord
- Slack
- VS Code
- Terminal
- QuickTime Player

### Output devices

- MacBook speakers
- Wired headphones
- Bluetooth headphones
- AirPods
- External display audio
- USB audio device

### Application lifecycle

```text
Launch app
Start audio
Stop audio
Quit app
Restart app
```

### System lifecycle

```text
Sleep
Wake
Connect headphones
Disconnect headphones
Change output device
Connect external monitor
Disconnect external monitor
```

---

# 27. Error Handling

Core Audio operations can fail.

Never crash the application because:

- An application closes while being controlled.
- An audio stream disappears.
- An output device disconnects.
- A process terminates.
- A Core Audio object becomes invalid.

Expected behavior:

```text
Operation fails
     ↓
Refresh audio state
     ↓
Remove stale application
     ↓
Continue running
```

The menu-bar utility should remain alive.

---

# 28. Security and Privacy

Mixer should be:

```text
Local-first
No account
No backend
No telemetry by default
No network dependency
```

Do not collect:

- Application usage history
- Audio recordings
- Microphone data
- User content

Mixer controls audio metadata and volume state only.

---

# 29. Agent Rules

When modifying this project:

1. Preserve the native Swift architecture.
2. Do not introduce React, Electron, or Tauri.
3. Prefer Apple frameworks over third-party dependencies.
4. Keep the application local-first.
5. Keep the UI minimal.
6. Isolate Core Audio code from SwiftUI.
7. Never assume a PID is a stable application identifier.
8. Handle application and audio-device lifecycle changes.
9. Avoid unnecessary polling.
10. Do not add features outside the product scope without justification.
11. Verify macOS API availability before using an API.
12. Prefer public APIs suitable for App Store distribution.
13. Document any private API or unsupported behavior immediately.
14. Test Core Audio behavior on real macOS hardware.
15. Do not claim per-app volume support works until it has been experimentally verified.

---

# 30. Definition of Done — MVP

Mixer MVP is complete when a user can:

```text
1. Launch Mixer
       ↓
2. Open the menu-bar mixer
       ↓
3. See applications producing audio
       ↓
4. Adjust Chrome volume independently
       ↓
5. Adjust Spotify volume independently
       ↓
6. Mute Discord
       ↓
7. Switch audio output devices
       ↓
8. Continue using Mixer without crashes
```

The application should feel like:

> **"The macOS Volume Mixer that macOS should have shipped."**

---

# 31. Product Identity

**Name:** Mixer

**Category:** Utilities

**Secondary Category:** Productivity

**Description:**

> Per-app volume control for macOS.

**Tagline:**

> **Mixer every app.**
