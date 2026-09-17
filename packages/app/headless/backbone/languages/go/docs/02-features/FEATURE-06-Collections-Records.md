# Backbone — FEATURE-06: Collections & Records

## 1. Summary

SQLite-backed collections with dynamic JSON schemas and full CRUD.

## 2. Behaviour

- Dynamic schemas: `string`, `number`, `integer`, `boolean`, `array`, `object`, `email`, `url`, optional `?`.
- Pagination (`page`, `per_page`) and search.
- Schema updates trigger column migrations.

## 3. Acceptance criteria

- Create/read/update/delete collections and records via API.
- Pagination and search return correct subsets.
- Schema evolution migrates columns safely.
