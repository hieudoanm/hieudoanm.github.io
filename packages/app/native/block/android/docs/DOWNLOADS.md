# Block

## Installation

| Platform | Requirements  | Download Link                   |
| -------- | ------------- | ------------------------------- |
| Android  | 6.0+ (API 23) | [Download `.aab`][download-aab] |
| Android  | 6.0+ (API 23) | [Download `.apk`][download-apk] |

[download-aab]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-native-block-latest/app-universal-release.aab
[download-apk]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-native-block-latest/app-universal-release.apk

## About

Android Focus Blocker — block distracting apps with a single toggle, powered
by Accessibility Service.

## Features

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

## Requirements

- Android 6.0 (API 23) or later
- NFC not required (app installs on non-NFC devices, NFC features disabled gracefully)
- Accessibility Service permission required for blocking functionality

## LICENSE

No LICENSE file is included for this project.
