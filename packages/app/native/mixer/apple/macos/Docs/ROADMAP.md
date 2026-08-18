# Roadmap

## Phase 1 — Core Menu Bar

> Foundation: system volume, app discovery, menu bar UI

- [x] Menu bar icon with speaker symbol
- [x] System volume slider with percentage
- [x] Mute/unmute toggle
- [x] Running application list
- [x] App icons and names
- [x] Settings window

## Phase 2 — Per-Application Volume

> Per-app control: Core Audio process objects, individual sliders

- [ ] Investigate Core Audio per-process volume APIs
- [ ] Implement per-app volume if supported
- [ ] Individual mute per application
- [ ] Volume persistence per app (by bundle ID)

## Phase 3 — Settings & Shortcuts

> Configuration: preferences, keyboard shortcuts, launch at login

- [x] Launch at login preference
- [x] Show inactive apps toggle
- [x] Remember volumes toggle
- [x] Global shortcut (Cmd+Shift+M)
- [ ] Shortcut customization UI

## Phase 4 — Audio Device Handling

> Device switching: output device detection, multi-device support

- [ ] Detect output device changes
- [ ] Show current output device name
- [ ] Switch between output devices
- [ ] Handle AirPods connect/disconnect

## Phase 5 — Polish & Distribution

> Quality: packaging, notarization, accessibility

- [ ] DMG packaging with `make dmg`
- [ ] macOS notarization
- [ ] App Store distribution
- [ ] Accessibility support (VoiceOver)
- [ ] Keyboard navigation
- [ ] Empty states and error handling

## Phase 6 — Advanced Features

> Power features: audio detection, app profiles, multi-output

- [ ] Real audio activity detection (if APIs allow)
- [ ] App audio profiles (save/restore volumes)
- [ ] Multi-output device support
- [ ] Aggregate device support
