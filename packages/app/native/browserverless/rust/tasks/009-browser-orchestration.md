# Task 009: Browser Orchestration

## Feature

### Status

completed

### Goal

Implement browser orchestration that ties all components together.

### Requirements

- Load HTML and CSS
- Compute styles
- Build layout
- Generate display list
- Render to image
- Export to PNG

### Non-goals

- Network loading
- JavaScript execution
- Event handling
- Caching

### Implementation

- `Browser` struct with pipeline stages
- Methods: `load_html`, `load_css`, `build_layout`, `build_display_list`, `render`, `render_to_image`
- Viewport configuration
- Full pipeline integration

### Verification

- 5 unit tests pass
- `cargo test -p browser`

### Acceptance Criteria

- Can create browser instance
- Can load HTML content
- Can set viewport size
- Can run full pipeline (HTML → DOM → Style → Layout → Display List → Render)
- Can save screenshot to PNG

### Notes

- Single-threaded for MVP
- No async support yet
