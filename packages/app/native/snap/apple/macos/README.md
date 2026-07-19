# Snap

Native macOS utility for window snapping, saved workspace layouts, and workspace restoration.

## Overview

Snap combines two capabilities: snap windows into predefined zones (left/right/halves, quarters, maximize, center), and save the current window arrangement as a named workspace that you can restore any time — even at different monitor resolutions.

## Features

- **Window snapping** — snap to left/right/top/bottom, quarters, maximize, and center.
- **Saved workspaces** — name a layout and restore it from the menu bar (`⌘⇧1`, `⌘⇧2`, …).
- **Zone system** — one shared zone model powers both live snapping and restoration.
- **Normalized coordinates** — layouts adapt to different monitor sizes and configurations.
- **Window matching** — match saved windows by bundle identifier (plus title/order), tolerating changed titles.
- **Multi-monitor aware** — stable display identifiers with fallback when a monitor is missing.
- **Menu bar** — workspaces and actions accessible without a large main window.

## Technology

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Language         | Swift 5.9+                                  |
| UI               | SwiftUI + AppKit menu bar                   |
| Window control   | Accessibility API (AXUIElement)             |
| Window discovery | CoreGraphics (`CGWindowListCopyWindowInfo`) |
| App lifecycle    | NSWorkspace / NSRunningApplication          |
| Displays         | NSScreen                                    |
| Persistence      | Codable JSON (Application Support)          |
| Build            | Swift Package Manager                       |
| Min macOS        | 13 Ventura                                  |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble Snap.app bundle
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```txt
Accessibility + CoreGraphics → WindowManager → LayoutManager → SwiftUI menu bar / editor
```

The workspace layout, zone, and monitor models are UI-independent.

## Documentation

- [Features](Docs/FEATURES.md)
- [Architecture](Docs/ARCHITECTURE.md)
- [Roadmap](Docs/ROADMAP.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).
