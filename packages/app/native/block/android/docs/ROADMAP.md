# Roadmap

> Local-first Android app blocker. No sign-in. Data stays on device. Blocking
> is powered by AccessibilityService; preferences live in DataStore; the blocked
> app list is persisted in Room.

## Phase 1 — Core Blocking (Shipped)

> The minimum viable blocker: pick apps, flip a switch, get blocked.

- [x] Project setup (Kotlin, Jetpack Compose, Material 3, Hilt, Room, DataStore)
- [x] Single-Activity architecture with Compose Navigation
- [x] AccessibilityService — detect foreground app changes
- [x] Room database — persist blocked app list
- [x] DataStore preferences — blocking on/off, settings
- [x] Home screen — status dashboard (accessibility, blocking, blocked count)
- [x] App picker — list installed apps with search and checkbox toggle
- [x] BlockActivity — full-screen overlay when blocked app is opened
- [x] Settings — enable/disable blocker, toggle preferences

## Phase 2 — Polish & Reliability

> Harden the blocking flow and improve UX.

- [ ] AccessibilityService resilience — handle service restart, crash recovery
- [ ] Proper handling of rapid app switching (debounce foreground events)
- [ ] Launch-on-boot via BroadcastReceiver
- [ ] Onboarding flow — guide user through enabling AccessibilityService
- [ ] Temporary disable (timer-based or until screen off)
- [ ] Blocked attempt counter and statistics display
- [ ] Notification shortcut to toggle blocker

## Phase 3 — Schedules

> Time-based blocking rules.

- [ ] Schedule entity (Room) — package, start/end time, days of week
- [ ] Schedule editor UI (time picker, day selector)
- [ ] WorkManager integration for schedule enforcement
- [ ] Per-app schedules (block Instagram 9 PM–7 AM, etc.)
- [ ] Schedule presets (focus hours, bedtime, work hours)

## Phase 4 — Focus Mode

> Turn blocking into a focus tool.

- [ ] Focus sessions (Pomodoro-style timer)
- [ ] Block everything during focus session
- [ ] Break reminders
- [ ] Session history and statistics
- [ ] Daily usage limits per app (e.g. 60 min/day Instagram)
- [ ] Category-based blocking (social, games, streaming, shopping)

## Phase 5 — Advanced

> Power-user features and platform polish.

- [ ] PIN protection for settings and temporary unlock
- [ ] Widget — quick toggle blocker on/off
- [ ] WearOS companion — glance at blocked status
- [ ] Cloud backup / restore (encrypted)
- [ ] Material You dynamic color
- [ ] Accessibility pass — TalkBack labels on all interactive elements
- [ ] E2E testing with Espresso / Compose Testing
