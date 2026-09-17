# Backbone — FEATURE-15: Import/Export + Backup

## 1. Summary

JSON export/import of all data and SQLite backup download.

## 2. Behaviour

- `internal/httpapi/importexport.go` — export/import all data as JSON.
- SQLite backup download available to admin only.

## 3. Acceptance criteria

- Export produces valid JSON of all data.
- Import restores data from JSON.
- Admin can download a SQLite backup file.
