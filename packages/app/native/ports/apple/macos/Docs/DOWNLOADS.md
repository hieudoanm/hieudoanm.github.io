# Ports

## Installation

| Platform | Minimum Version | Download |
|----------|----------------|----------|
| macOS | 13 Ventura | [Download .dmg](https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-native-ports-latest/Ports-0.0.1.dmg) |

## About

Ports — see which process owns a port from your menu bar.

## Features

## Menu Bar

- Compact menu-bar plug icon (`cable.connector`)
- Click opens a native popover with a port list
- No Dock icon (accessory app)

## Port List

- Live discovery of processes listening on local TCP and UDP ports
- Automatic refresh at a configurable interval (default 1 second)
- Each row shows port, process, and PID
- Secondary line shows command, executable, or address
- Empty and error states explain what is happening

## Search

- Narrow the list by port, process, PID, project, or command
- Search box in the popover header
- Matching is case-insensitive and partial

## Kill Process

- Right-click a row for `Kill Process` (SIGTERM) or `Force Kill` (SIGKILL)
- Both require explicit confirmation — nothing is ever killed automatically
- Killing the app process itself is refused
- Failure shows a concise message; the row disappears when the process exits

## Copy Actions

- Context menu on each row:
  - Copy Address (`localhost:3000`)
  - Copy Port
  - Copy PID
- Uses `NSPasteboard`

## Settings

- Refresh interval presets (1/2/5/10 seconds)
- Settings window is opened from the popover gear icon and returns the app to
  accessory mode when closed

## UX

- App is `LSUIElement` — runs without a Dock icon or menu bar
- Runs entirely on your Mac — no network, no telemetry
- Native SwiftUI with semantic system colors for Light and Dark Mode
- Empty and search-empty states explain the current view
- Accessibility labels on all icon-only controls

## Requirements

- macOS 13 Ventura

## LICENSE

See [LICENSE](LICENSE).
