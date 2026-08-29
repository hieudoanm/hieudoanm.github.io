# Clipper

Minimal, local-first clipboard manager for macOS.

## Overview

Clipper is a native SwiftUI menu-bar utility that keeps a searchable history of everything you copy, so nothing you copy is ever lost. It is lightweight, local-first, and requires no network or account.

## Features

- **Menu bar** — clipboard icon with a popover for quick access; no Dock icon (accessory mode).
- **Clipboard history** — text, image, and file support with timestamps.
- **Search & filtering** — search history and filter by content type, one-click copy.
- **Pin items** — keep important clips; dedupe repeated copies.
- **Settings** — maximum history items, launch-at-login, and global shortcut.

## Technology

| Layer | Technology |
| --- | --- |
| Language | Swift 5.9+ |
| UI | SwiftUI + AppKit menu bar |
| Clipboard | `NSPasteboard` monitoring |
| Persistence | Codable JSON |
| Build | Swift Package Manager |
| Min macOS | 13 Ventura |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble Clipper.app bundle
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```
NSPasteboard → ClipboardMonitor → ClipperViewModel → SwiftUI menu-bar popover
```

History/state logic lives in the UI-independent `Core` library; the SwiftUI layer is a thin presentation on top.

## Documentation

- [Features](Docs/FEATURES.md)
- [Architecture](Docs/ARCHITECTURE.md)
- [Roadmap](Docs/ROADMAP.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).
