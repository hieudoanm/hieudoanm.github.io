# Roadmap

## Phase 1 — Core Snapping

> Foundation: window discovery, snapping zones, menu bar UI

- [ ] Menu bar icon with grid symbol
- [ ] Accessibility permission onboarding
- [ ] Discover current windows
- [ ] Move and resize windows
- [ ] Left/right half snapping
- [ ] Top/bottom half snapping
- [ ] Quarter snapping (corners)
- [ ] Maximize and center
- [ ] Menu bar popover UI

## Phase 2 — Workspace Management

> Save/restore: named layouts, persistence, quick access

- [ ] Save current window layout
- [ ] Name saved layouts
- [ ] List saved layouts
- [ ] Restore saved layouts
- [ ] Delete saved layouts
- [ ] JSON persistence

## Phase 3 — Multi-Monitor

> Displays: detection, zone assignment, resolution adaptation

- [ ] Detect multiple displays
- [ ] Associate zones with screens
- [ ] Normalized coordinates
- [ ] Adapt layouts to different resolutions
- [ ] Handle monitor connect/disconnect

## Phase 4 — Application Rules

> Matching: bundle ID, window titles, app launch

- [ ] Match windows by bundle identifier
- [ ] Tolerate changing window titles
- [ ] Support multiple windows per app
- [ ] Track window ordering
- [ ] Launch missing applications (configurable)

## Phase 5 — Settings & Shortcuts

> Configuration: preferences, keyboard shortcuts, launch at login

- [ ] Launch at login preference
- [ ] Global shortcut (Cmd+Shift+S)
- [ ] Configurable snap shortcuts
- [ ] Missing app behavior setting

## Phase 6 — Advanced Features

> Power: custom zones, automation, profiles

- [ ] Custom snap zones
- [ ] Custom grid layouts
- [ ] Drag-to-zone
- [ ] Zone previews
- [ ] Auto-restore on login
- [ ] Auto-restore when monitor connects
- [ ] Workspace profiles

## Phase 7 — Polish & Distribution

> Quality: packaging, notarization, accessibility

- [ ] DMG packaging with `make dmg`
- [ ] macOS notarization
- [ ] App Store distribution
- [ ] Accessibility support (VoiceOver)
- [ ] Keyboard navigation
