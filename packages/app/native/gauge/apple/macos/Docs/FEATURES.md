# Features

> Gauge — RAM and storage usage at a glance from your menu bar.

## Menu Bar

- Compact indicator: `CPU 39%   Disk 83%`
- SF Symbols instead of emoji, monospaced digits keep the item width stable
- Click opens a native popover with details
- Configurable display style (Settings → Menu Bar):
  - Percentages: `CPU 39%   Disk 83%`
  - Values: `CPU 39%   Disk 412 GB`
  - Used / Total: `CPU 39%   Disk 412/494 GB`

## Memory

- Used / total (`12.4 / 32 GB`)
- Breakdown: active / wired / compressed
- Availability: cached / inactive / free
- Percentage (`39% used`)
- Progress bar tinted by usage threshold
- Defined metric: active + wired + compressed

## Storage

- Used / total (`412 / 494 GB`)
- Free and purgeable amounts
- Percentage (`83% used`)
- Progress bar tinted by usage threshold
- Boot volume (`/`) in v1

## CPU

- Aggregate load percentage
- Load average (`Load 2.1 · 1.8 · 1.5`)
- Progress bar tinted by usage threshold
- Delta of per-CPU tick counters between reads, load average from `getloadavg`

## System

- Hardware chip (e.g. `Mac14,7`)
- Core count
- Uptime
- Single footer line: `Mac14,7 · 8 cores · Up 2d 1h`

## Swap

- Used / total swap
- Progress bar tinted by usage threshold
- Shown only when swap is configured

## Popover

- Two views, switchable from the header chevron:
  - Small view: compact percentage and used / total numbers (CPU with load average, RAM, storage, swap)
  - Details view: full sections with progress bars
- Memory section (details) with active / wired / compressed and cached / inactive / free breakdowns
- Storage section (details) with free / purgeable amounts
- CPU section (details) with load average
- Swap section (details)
- System footer (details) with chip / cores / uptime
- Memory pressure status (details), read from the kernel
  (`kern.memorystatus_vm_pressure_level`): `Normal` / `Warning` / `Critical`

## Settings

- Refresh interval presets (1/2/5/10 seconds)
- Menu Bar display style (Percentages / Values / Used-Total)
- Launch at Login via `SMAppService`
- No special permissions required

## UX

- Values refresh every second by default
- Automatic color coding only at meaningful thresholds
- Light and Dark Mode friendly via semantic colors (no hard-coded colors)
- Accessible labels on all controls
- Every section exposes a combined VoiceOver label (e.g. `Memory, 39% used, 12.4 GB of 32 GB`)
- Menu-bar item is a single accessibility element that announces `39% CPU, 83% disk` and updates frequently
- Error states render a distinct `Unable to read` row with a warning icon instead of blank or zero values
- Menu-bar label uses monospaced digits and a fixed size so the indicator width stays stable