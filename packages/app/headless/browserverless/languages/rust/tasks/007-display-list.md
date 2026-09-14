# Task 007: Display List

## Feature

### Status

completed

### Goal

Generate display list commands from layout tree.

### Requirements

- DrawRect for backgrounds
- StrokeRect for borders
- DrawText for text content
- Clip and Transform (future)

### Non-goals

- GPU acceleration
- Layer compositing
- Anti-aliasing

### Implementation

- `DisplayList` with `Vec<DisplayCommand>`
- Commands: FillRect, StrokeRect, DrawText
- Background rendering for elements
- Border rendering
- Text rendering (placeholder)

### Verification

- 5 unit tests pass
- `cargo test -p paint`

### Acceptance Criteria

- Can create empty display list
- Can add fill rect commands
- Can build display list from layout boxes
- Can calculate content rect

### Notes

- Text rendering is simplified (block characters)
- No font loading yet
