# Roadmap

## Phase 1 — Core Clock Apps

> Foundation: Pomodoro, Watchface, World Clock, Timer, Stopwatch

- [x] Pomodoro with work/break cycles and 3 presets
- [x] SVG circular progress for Pomodoro
- [x] WebAudio beep for Pomodoro alerts
- [x] Watchface with dot and minimal modes
- [x] Real-time display via requestAnimationFrame
- [x] World Clock with 14 timezone cities
- [x] Open-Meteo weather integration
- [x] Timer with 6 presets and countdown
- [x] Stopwatch with lap tracking
- [x] nothing theme (black, white, red)
- [x] ClockApp shell with tab navigation
- [x] Header with nav links (About, Downloads, Version)

## Phase 2 — Persistence & Polish

> Storage: localStorage persistence, search, favorites

- [x] Pomodoro state persistence
- [x] World Clock favorites persistence
- [x] WeatherBadge with weather codes
- [x] CityCard with timezone + weather
- [x] ThemeToggle component
- [x] PWA manifest with offline support
- [x] Atomic design structure (atoms, molecules, organisms, templates)
- [x] src-tauri scaffolding (build.rs, Cargo.toml, tauri.conf.json)

## Phase 3 — Platform & Integration

> Ecosystem: native apps, enhanced features

- [ ] Tauri desktop app signing and notarization
- [ ] iOS/Android native shells (Tauri Mobile)
- [ ] Custom alarm sounds for Timer/Pomodoro
- [ ] Visual customization (colors, themes)
- [ ] Keyboard shortcuts for all clock tools
- [ ] Export timer/stopwatch sessions as JSON
- [ ] Cloud sync for preferences (mock)

## Phase 4 — Advanced Features

> Power: productivity features, integrations

- [ ] Pomodoro statistics and history
- [ ] World Clock event scheduling
- [ ] Timer templates (custom preset combinations)
- [ ] Stopwatch lap export as CSV
- [ ] Ambient mode for Watchface (screensaver)
- [ ] Widget support (Tauri)
- [ ] AI-assisted scheduling suggestions (mock)
