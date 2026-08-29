# Mixer

Native macOS per-application audio volume mixer, from the menu bar.

## Overview

Mixer is a native macOS menu-bar utility for controlling the audio volume of individual applications — the volume mixer macOS never shipped. It lets you adjust each app's volume independently, mute/unmute individual apps, and switch between audio output devices, all without opening a full application window.

## Features

- **Per-app volume** — independent slider (0–100%) for each audio-producing application.
- **Mute / unmute** — per-app toggle that remembers the previous volume.
- **Audio activity** — distinguish active, inactive, and muted applications.
- **Menu bar** — popover mixer with the application list and volume sliders.
- **Output device awareness** — handles switching between speakers, AirPods, USB DACs, and displays.
- **Settings** — launch-at-login, show inactive apps, remember volumes.

## Technology

| Layer         | Technology                         |
| ------------- | ---------------------------------- |
| Language      | Swift 5.9+                         |
| UI            | SwiftUI + AppKit menu bar          |
| Audio         | Core Audio / AudioToolbox          |
| App discovery | NSWorkspace                        |
| Persistence   | Codable JSON (Application Support) |
| Build         | Swift Package Manager              |
| Min macOS     | 13 Ventura                         |

## Build

```bash
make build     # Swift debug build
make test      # Run unit tests
make app       # Assemble Mixer.app bundle
make dev       # Build (debug) and launch
make clean     # Remove build artifacts
```

## Architecture

```txt
Core Audio → AudioManager → MixerViewModel → SwiftUI menu-bar popover
```

Audio-engine code is UI-independent; stable application identity uses the bundle identifier, never a PID.

## Documentation

- [Features](Docs/FEATURES.md)
- [Architecture](Docs/ARCHITECTURE.md)
- [Roadmap](Docs/ROADMAP.md)
- [Packaging](Docs/PACKAGING.md)
- [Contributing](Docs/CONTRIBUTING.md)

## License

See [LICENSE](LICENSE).
