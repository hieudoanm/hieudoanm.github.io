# Task 016: Style Tag Extraction & GUI Mode

## Feature

Extract `<style>` tags from HTML and add winit GUI mode.

## Status

completed

## Goal

1. Automatically extract and parse CSS from `<style>` tags in HTML
2. Add windowed GUI display using winit + softbuffer

## Requirements

- Extract `<style>` content from DOM tree
- Parse extracted CSS and merge with external CSS
- winit-based windowed display
- softbuffer for pixel rendering
- Shared browser core between headless and GUI modes

## Non-goals

- `<link>` tag stylesheet loading
- JavaScript-driven style changes
- Advanced window features (tabs, bookmarks)

## Implementation

### Style Tag Extraction
- Added `extract_style_from_dom()` to Browser
- Added `collect_style_content()` recursive helper
- Modified `load_html()` to extract CSS from `<style>` tags
- Modified `load_css()` to merge with existing stylesheet

### GUI Mode
- Created `gui` crate with winit + softbuffer
- Implemented `GuiBrowser` struct with `load_html()` and `run()`
- Added `GuiBrowserApp` implementing `ApplicationHandler`
- Renders browser output to window using softbuffer

## Verification

```bash
cargo test
cargo clippy
cargo fmt
```

## Acceptance Criteria

- [x] `<style>` tags automatically extracted from HTML
- [x] External CSS merges with inline CSS
- [x] GUI window displays rendered content
- [x] 3 new browser tests pass
- [x] 2 new GUI tests pass
- [x] Total test count: 90
- [x] Clippy clean
- [x] Formatted

## Notes

- `load_css()` now appends to existing stylesheet instead of replacing
- GUI uses softbuffer for CPU-based rendering (no GPU dependency)
- Window redraws on resize
