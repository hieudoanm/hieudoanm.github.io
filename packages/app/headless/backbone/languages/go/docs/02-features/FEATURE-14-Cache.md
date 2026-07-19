# Backbone — FEATURE-14: Cache

## 1. Summary

In-memory TTL cache with SQLite persistence.

## 2. Behaviour

- `internal/cache` — TTL cache (list/get/set/flush) + `GET /api/cache/stats`.
- Periodic eviction sweep; entries copied to the SQLite `cache` table so restarts survive.

## 3. Acceptance criteria

- Set/get/flush cache entries via API.
- Cache stats endpoint returns hit/miss counts.
- Entries survive a restart via SQLite persistence.
