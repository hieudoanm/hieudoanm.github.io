# Roadmap

## Phase 1 -- Core Pinning

> Basic always-on-top functionality.

- [x] Menu bar icon with popover
- [x] Window discovery via Accessibility API
- [x] Pin/unpin toggle per window
- [x] Window level change (0 ↔ 25)
- [x] Visual indicator for pinned windows
- [x] Persistence across app restarts

## Phase 2 -- Settings

> User preferences and quality of life.

- [x] Launch at login
- [x] Re-pin windows on app relaunch
- [ ] Customizable window level (above/below status bar)
- [ ] Keyboard shortcut for pin/unpin
- [ ] Excluded applications list

## Phase 3 -- Window Management

> Smarter pinning and detection.

- [ ] Detect when a pinned window closes
- [ ] Restore pinned state when window reappears
- [ ] Pin by application (all windows of an app)
- [ ] Bulk unpin per application
- [ ] Handle multiple displays

## Phase 4 -- Advanced Features

> Power user features.

- [ ] Pin to specific display only
- [ ] Per-app pinning rules
- [ ] Smart pinning (remember preferred level per app)
- [ ] Accessibility audit (detect problematic apps)
- [ ] Global keyboard shortcut

## Phase 5 -- Polish & Distribution

> Production readiness.

- [ ] App notarization
- [ ] Accessibility permission UX improvements
- [ ] Error recovery for failed level changes
- [ ] Logging and diagnostics
- [ ] Auto-update via Sparkle
