# Task 012: Integration Tests & Golden Fixtures

## Feature

Integration tests with HTML/CSS fixture files for the full browser pipeline.

## Status

completed

## Goal

Validate that the complete pipeline (HTML → DOM → Style → Layout → DisplayList → Render) works correctly using realistic HTML/CSS fixtures, not just synthetic inline strings.

## Requirements

- Golden test fixtures in `tests/html/`, `tests/css/`, `tests/rendering/`
- Integration test in `crates/browser/tests/pipeline_test.rs`
- Fixtures cover: basic HTML, nested elements, malformed HTML, attributes, CSS colors/margin/padding/selectors, block layout, text, MVP page
- Tests verify: DOM structure, attributes, rendering dimensions, pipeline completion

## Non-goals

- Visual regression testing (pixel comparison)
- CSS inheritance (pending)
- HTTP networking (pending)

## Implementation

Created 9 fixture files:
- `tests/html/basic.html`, `nested.html`, `malformed.html`, `attributes.html`
- `tests/css/colors.html`, `margin.html`, `padding.html`, `selectors.html`
- `tests/rendering/block-layout.html`, `text.html`, `mvp.html`

Created integration test with 12 tests:
- DOM parsing tests (basic, nested, malformed, attributes)
- CSS rendering tests (colors, margin, padding, selectors)
- Layout tests (block, text, MVP)
- Screenshot output test

## Verification

```bash
cargo test
cargo clippy
```

## Acceptance Criteria

- [x] All 9 fixture files exist
- [x] 12 integration tests pass
- [x] Total test count: 72 (60 unit + 12 integration)
- [x] `cargo clippy` passes

## Notes

- Integration tests located in `crates/browser/tests/` (not workspace root `tests/`)
- Uses `CARGO_MANIFEST_DIR` to resolve fixture paths relative to workspace root
- `find_element_recursive` helper navigates DOM tree for attribute tests
