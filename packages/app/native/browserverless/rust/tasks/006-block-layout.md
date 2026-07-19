# Task 006: Block Layout

## Feature

### Status

completed

### Goal

Implement block-level layout algorithm.

### Requirements

- Build layout tree from DOM + computed styles
- Block and inline box types
- Box model: margin, padding, border, content
- Width and height calculation
- Vertical stacking of blocks

### Non-goals

- Flexbox
- Grid
- Float
- Position (absolute/fixed)
- Margin collapse

### Implementation

- `LayoutBox` with node_id, box_type, children, rect
- `Rect` with x, y, width, height
- Block layout with vertical stacking
- Inline/text layout for text nodes

### Verification

- 6 unit tests pass
- `cargo test -p layout`

### Acceptance Criteria

- Can build layout tree from DOM
- Can compute box dimensions
- Can layout single block
- Can estimate text width

### Notes

- Simplified layout (no margin collapse)
- Text rendering is placeholder (block characters)
