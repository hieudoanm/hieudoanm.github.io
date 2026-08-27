# Task 003: HTML Parser

## Feature

### Status

completed

### Goal

Implement a custom HTML parser that constructs a DOM tree from HTML input.

### Requirements

- Parse element tags (start and end)
- Parse attributes with quoted values
- Parse text content
- Parse comments
- Parse doctype
- Handle void elements (br, img, input, etc.)
- Handle self-closing tags

### Non-goals

- Full HTML5 spec compliance
- Error recovery
- Foreign content (SVG, MathML)

### Implementation

- Custom character-by-character parser
- Tag parsing with attribute extraction
- Stack-based nesting
- Void element detection

### Verification

- 8 unit tests pass
- `cargo test -p html`

### Acceptance Criteria

- Can parse `<div></div>`
- Can parse nested elements
- Can parse attributes: `<div class="box" id="main">`
- Can parse text content
- Can parse comments
- Can parse void elements

### Notes

- Chose custom parser over html5ever for simplicity
- Can upgrade to html5ever later for full spec compliance
