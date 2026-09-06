# Task 011: Networking

## Feature

### Status

completed

### Goal

Implement basic networking for resource loading.

### Requirements

- Resource types (HTML, CSS, JS, Image, Font)
- Resource loading from memory
- Content type detection
- URL-based resource lookup

### Non-goals

- HTTP/HTTPS fetching
- Redirects
- Caching
- Compression

### Implementation

- `ResourceLoader` with HashMap storage
- `Resource` struct with URL, content type, body, status
- `ResourceType` enum with content type detection
- In-memory resource loading

### Verification

- 6 unit tests pass
- `cargo test -p network`

### Acceptance Criteria

- Can detect resource type from content type
- Can detect resource type from URL extension
- Can insert and load resources
- Can load HTML and CSS resources
- Proper error handling for missing resources

### Notes

- In-memory only for MVP
- Real HTTP loading will be added later
