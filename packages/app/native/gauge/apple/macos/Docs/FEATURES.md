# Features

> Gauge — RAM and storage usage at a glance from your menu bar.

## Menu Bar

- Compact indicator: `CPU 39%   Disk 83%`
- SF Symbols instead of emoji, monospaced digits keep the item width stable
- Click opens a native popover with details

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
- Memory pressure status (details)

## Settings

- Refresh interval (1/2/5/10 seconds)
- No special permissions required

## UX

- Values refresh every second by default
- Automatic color coding only at meaningful thresholds
- Light and Dark Mode friendly via semantic colors
- Accessible labels on all controls