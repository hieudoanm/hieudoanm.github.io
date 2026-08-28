# Roadmap

## Phase 1 — Skeleton

> macOS menu-bar app with the Gauge popover.

- [x] Swift Package Manager project
- [x] Menu-bar item with popover
- [x] Native SwiftUI UI shell
- [x] No Dock icon (accessory app)

## Phase 2 — Memory

> Mach-based memory monitoring.

- [x] `host_statistics64` read
- [x] `MemoryStats` model with ratio/percentage
- [x] Memory progress bar
- [x] Byte formatting

## Phase 3 — Storage

> Foundation-based disk monitoring.

- [x] Boot volume capacity read
- [x] `DiskStats` model with ratio/percentage
- [x] Storage progress bar
- [x] Byte formatting

## Phase 4 — Combined UI

> Both metrics in the menu bar and popover.

- [x] `CPU 39%   Disk 83%` menu-bar indicator
- [x] Memory + Storage sections in popover
- [x] Used / total values
- [x] Memory pressure status row

## Phase 5 — Polish

> Fit and finish.

- [ ] Spacing and typography review
- [ ] Dark Mode / Light Mode verification
- [ ] Accessibility audit
- [ ] Menu-bar width tuning
- [ ] Error-state review

## Phase 6 — Optional Features

> Only after the core product is stable.

- [ ] Memory pressure detail
- [x] Swap usage
- [x] CPU usage
- [x] CPU load average (1/5/15 min)
- [x] Full RAM breakdown (active / wired / compressed / cached / inactive / free)
- [x] System info (chip / cores / uptime)
- [ ] Additional metrics (battery, network, temperature)
- [ ] Launch at login via `SMAppService`
- [ ] Configurable refresh interval (presets shipped in v1)
- [ ] Configurable menu-bar display
- [ ] Threshold customization
