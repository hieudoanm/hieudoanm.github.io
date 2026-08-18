# Task 005: Style System

## Feature

### Status

completed

### Goal

Implement CSS cascade and computed style calculation.

### Requirements

- Match selectors against DOM nodes
- Compute styles by applying matching rules
- Support cascading (later rules override earlier)
- Support inline styles
- Default styles for elements

### Non-goals

- Full CSS specificity calculation
- Important rules
- Inheritance
- Pseudo-classes

### Implementation

- `StyleContext` with computed styles per node
- Selector matching for type, class, ID, universal
- Descendant and child combinator matching
- Inline style application from `style` attribute

### Verification

- 5 unit tests pass
- `cargo test -p style`

### Acceptance Criteria

- Can compute text color from stylesheet
- Can match class selectors
- Can match ID selectors
- Can cascade styles (later rules win)
- Can apply inline styles

### Notes

- Simplified specificity (no !important yet)
- Inheritance not implemented yet
