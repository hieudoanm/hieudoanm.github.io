# Backbone — FEATURE-07: Files & Buckets

## 1. Summary

Buckets + multipart file uploads with optional image thumbnails.

## 2. Behaviour

- Multipart uploads max 10 MB, stored under `<dataDir>/uploads`.
- Download, delete, list files per bucket.
- 256px JPEG thumbnails for jpeg/png/webp/gif via `golang.org/x/image` (`internal/httpapi/buckets.go` + `image.go`).

## 3. Acceptance criteria

- Upload a file; download returns the same bytes.
- Thumbnail generated for supported image types.
- Delete removes file and metadata.
