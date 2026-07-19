# Task 013: CSS Inheritance

## Feature

CSS property inheritance from parent to child nodes.

## Status

completed

## Goal

Implement CSS inheritance so that certain properties (`color`, `font-size`, `font-family`, `font-weight`, `visibility`, `opacity`) are inherited from parent to child nodes unless overridden.

## Requirements

- Only specific properties are inherited (not box model, display, background)
- Children inherit from parent's computed style
- CSS rules can override inherited values
- Inline styles have highest priority
- Deep inheritance (grandparent -> parent -> child) works

## Non-goals

- `initial` and `unset` keywords
- `inherit` keyword
- CSS specificity inheritance

## Implementation

- Added `inherited()` method to `ComputedStyle` that returns a new style with only inherited properties
- Modified `compute_node()` to accept parent style and inherit from it
- Added `style_ctx` field to `Browser` struct for accessing computed styles
- Added `style_context()` getter to `Browser`

## Verification

```bash
cargo test
```

## Acceptance Criteria

- [x] 5 new style tests pass (inherit_color, inherit_font_size, child_override, background_not_inherited, deep_inheritance)
- [x] 1 new integration test passes (test_css_inheritance)
- [x] Total test count: 78
- [x] All existing tests still pass

## Notes

- Browser doesn't parse `<style>` tags from HTML yet - CSS must be loaded via `load_css()`
- `style_ctx` is recomputed on each `build_layout()` / `build_display_list()` call
