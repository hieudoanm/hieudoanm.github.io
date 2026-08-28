# Features

> Gauge — RAM and storage usage at a glance from your menu bar.

## Menu Bar

- Compact indicator: `CPU 39%   Disk 83%`
- SF Symbols instead of emoji, monospaced digits keep the item width stable
- Click opens a native popover with details

## Memory

- Used / total (`12.4 / 32 GB`)
- Breakdown: active / wired / compressed
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
- Progress bar tinted by usage threshold
- Delta of per-CPU tick counters between reads

## Swap

- Used / total swap
- Progress bar tinted by usage threshold
- Shown only when swap is configured

## Popover

- Two views, switchable from the header chevron:
  - Small view: compact percentage and used / total numbers (RAM, storage, CPU, swap)
  - Details view: full sections with progress bars
- Memory section (details) with active / wired / compressed breakdown
- Storage section (details) with free / purgeable amounts
- CPU section (details)
- Swap section (details)
- Memory pressure status (details)

## Settings

- Refresh interval (1/2/5/10 seconds)
- No special permissions required

## UX

- Values refresh every second by default
- Automatic color coding only at meaningful thresholds
- Light and Dark Mode friendly via semantic colors
- Accessible labels on all controls