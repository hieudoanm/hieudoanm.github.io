# Task 014: HTTP Networking

## Feature

HTTP fetching via reqwest in the network crate.

## Status

completed

## Goal

Add real HTTP fetching capability to the `ResourceLoader` using reqwest, enabling the browser to load resources from URLs.

## Requirements

- `fetch()` method that loads resources from HTTP/HTTPS URLs
- Response caching (fetch once, load from cache)
- Timeout support via `with_timeout()`
- Content-type detection from response headers
- Proper error handling with `thiserror`

## Non-goals

- Async fetching (blocking is sufficient for MVP)
- Redirect following (reqwest handles this automatically)
- Cookie management
- Compression handling (reqwest handles this)

## Implementation

- Added `reqwest` to workspace and network crate dependencies
- Added `fetch()` method to `ResourceLoader`
- Added `with_timeout()` constructor
- Added `body_as_string()` helper
- Migrated `NetworkError` to use `thiserror` derive
- Added 2 new tests (fetch_caches_response, body_as_string_conversion)

## Verification

```bash
cargo test
```

## Acceptance Criteria

- [x] reqwest added to workspace dependencies
- [x] `fetch()` method compiles and works
- [x] 2 new tests pass
- [x] Total test count: 80
- [x] All existing tests still pass

## Notes

- Uses `reqwest::blocking::Client` for simplicity
- `fetch()` checks cache before making HTTP request
- `body_as_string()` converts response bytes to UTF-8 string
