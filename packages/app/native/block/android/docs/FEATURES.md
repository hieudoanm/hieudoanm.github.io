# Features

> Android Focus Blocker — block distracting apps with a single toggle, powered
> by Accessibility Service.

## Blocking

- Enable/disable blocking with one toggle
- Detect foreground app changes via AccessibilityService
- Instant blocking screen overlay when a blocked app is detected
- Per-app toggle — select exactly which apps to block
- Ignore system apps filter (on by default)
- Track last blocked time for statistics

## App Picker

- List all installed applications
- Search apps by name
- Show app icons and labels
- Alphabetical sorting
- Fast scrolling with LazyColumn
- Checkbox toggle per app

## Home Dashboard

- Accessibility Service status indicator
- Blocking on/off status
- Number of blocked apps
- Quick navigation to app list and settings

## Settings

- Enable/disable blocker
- Enable/disable AccessibilityService prompt
- Launch on boot toggle
- Dark mode toggle
- Ignore system apps toggle
- Temporary disable

## Blocking Screen

- Full-screen overlay — blocks access to the underlying app
- "Stay Focused" message with blocked app name
- "Go Home" button to dismiss
- Prevents multiple instances (singleInstance launch mode)
- Hides from recent apps

## Persistence

- Room database for blocked app list
- DataStore preferences for all settings
- All data stored locally — no cloud sync

---

See [docs/ROADMAP.md](ROADMAP.md) for planned features.
