# Backbone — FEATURE-10: Cron Jobs

## 1. Summary

Scheduled jobs executed in-process with manual triggers and run logs.

## 2. Behaviour

- `internal/cron` — CRUD + manual `/run`, plus an in-process scheduler checking due jobs every interval.
- Fires due cron jobs via `events` fan-out.
- Per-job run logs stored in SQLite.

## 3. Acceptance criteria

- Cron schedule (e.g. `*/5 * * * *`) triggers the job.
- Manual `/run` executes a job on demand.
- Run logs record success/failure per job.
