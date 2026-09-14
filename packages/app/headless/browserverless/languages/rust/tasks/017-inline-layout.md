# Task 017: Inline Text Layout

## Feature

Improved inline text layout with horizontal flow and wrapping.

## Status

completed

## Goal

Improve inline layout to handle horizontal flow within blocks and basic text wrapping.

## Requirements

- Inline elements flow horizontally within block containers
- Text wraps when exceeding viewport width
- Proper positioning of inline elements

## Non-goals

- Full CSS inline formatting context
- Line breaking algorithms
- Word spacing/justification

## Implementation

- Modified `layout_inline()` to check available width
- Added line wrapping when inline element exceeds viewport width
- Updated `layout_inline()` to accept `LayoutContext` for viewport width

## Verification

```bash
cargo test
cargo clippy
```

## Acceptance Criteria

- [x] Inline elements flow horizontally
- [x] Text wraps at viewport boundary
- [x] All 90 tests pass
- [x] Clippy clean

## Notes

- Basic wrapping only - wraps at viewport width
- No word-level breaking yet
