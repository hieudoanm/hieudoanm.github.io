# Roadmap

## Phase 1 — Foundation

> Native menu-bar app with the Ports popover.

- [x] Swift Package Manager project (PortsCore + Ports + PortsTests)
- [x] Menu-bar item with popover (`.menuBarExtraStyle(.window)`)
- [x] Native SwiftUI UI shell
- [x] No Dock icon (accessory app)
- [x] Domain models: `PortInfo`, `NetworkEndpoint`, `NetworkProtocol`, `PortState`
- [x] Search field and empty states
- [x] Copy actions (address / port / PID)
- [x] Settings window (refresh interval) using a `Window` scene
- [x] Unit tests for models, search, network endpoints, and settings

## Phase 2 — Port Discovery

> `lsof`-backed discovery of listening TCP/UDP ports.

- [x] `lsof` discovery service behind a `PortDiscovering` protocol
- [x] TCP listening ports
- [x] UDP ports (bound sockets; connected sockets excluded)
- [x] Parse PID, process name, address, port number
- [x] Automatic refresh at a configurable interval with diffing

## Phase 3 — Developer Context

- [ ] executable path
- [ ] command line
- [ ] working directory
- [ ] project detection
- [ ] process tree

## Phase 4 — Actions

- [ ] Open in Browser (`NSWorkspace`)
- [x] Kill / Force Kill (never automatic, never primary)
- [ ] Show details

## Phase 5 — UX

- [ ] `⌘F` focus search, `↑/↓` navigate, `Return` select, `⌘C` copy, `Esc` close
- [ ] Filters (All / TCP / UDP / Listening / Established / Development / System / Docker)
- [ ] Context menu
- [ ] Accessibility audit

## Phase 6 — Advanced Features

- [ ] Port conflict detection
- [ ] Favorites and port aliases
- [ ] History
- [ ] Notifications
- [ ] Docker awareness
- [ ] Global keyboard shortcut
- [ ] AI-agent process awareness