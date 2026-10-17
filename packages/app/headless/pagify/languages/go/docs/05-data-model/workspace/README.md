# pagify — Data Model: workspace package

The `workspace` package confines file access to a single root directory.

## Responsibilities

- Resolve every content path a request names against `--root`.
- Prevent the API from reading outside its root (path-traversal protection).
