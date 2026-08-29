# Top

Always-on-top for any window, from your macOS menu bar.

## Overview

Top is a lightweight native macOS menu-bar utility that pins any window to always-on-top with a single click, and remembers your pinned windows across sessions so they are re-pinned automatically when apps relaunch.

## Features

- **Menu bar** — `pin.fill` icon that opens a popover listing all open windows, grouped by application with app icons.
- **Window pinning** — pin/unpin toggle per window; toggles window level (0 ↔ 25) with a visual indicator.
- **Persistence** — pinned windows survive app restarts and re-pin on relaunch.
- **Permissions** — clear Accessibility permission onboarding.

## Technology

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Language       | Swift 5.9+                      |
| UI             | SwiftUI + AppKit menu bar       |
| Window control | Accessibility API (AXUIElement) |
| App discovery  | NSWorkspace / CoreGraphics      |
| Persistence    | Codable JSON + FileManager      |
| Build          | Swift Package Manager           |
| Min macOS      | 13 Ventura                      |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble Top.app bundle
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```txt
NSWorkspace / CoreGraphics → WindowDiscovery → WindowPinningService → SwiftUI popover
```

Pinned-window state lives in the UI-independent `Core` library; the SwiftUI layer is a thin presentation on top.

## Documentation

- [Features](Docs/FEATURES.md)
- [Architecture](Docs/ARCHITECTURE.md)
- [Roadmap](Docs/ROADMAP.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).
