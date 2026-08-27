# Task 008: Software Renderer

## Feature

### Status

completed

### Goal

Implement basic software renderer to image buffer.

### Requirements

- Render to RGBA image buffer
- Fill rectangles with color
- Stroke rectangles (borders)
- Save to PNG

### Non-goals

- GPU rendering
- Font rendering
- Image decoding
- Anti-aliasing

### Implementation

- `SoftwareRenderer` with `RgbaImage` buffer
- `RenderOptions` for viewport size and background
- Fill and stroke rectangle rendering
- PNG output via `image` crate

### Verification

- 6 unit tests pass
- `cargo test -p renderer`

### Acceptance Criteria

- Can create renderer with viewport size
- Can render empty display list (background fill)
- Can render filled rectangles
- Can handle out-of-bounds coordinates
- Can save to PNG file

### Notes

- Uses `image` crate for PNG output
- Text rendering is placeholder
