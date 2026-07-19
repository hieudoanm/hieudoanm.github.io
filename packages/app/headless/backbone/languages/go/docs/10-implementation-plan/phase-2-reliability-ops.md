# Backbone — Phase 2: Reliability & Ops

## Goal

Add durability and operational tooling.

## Deliverables

- Durable async job queues (SQS-style).
- Prometheus metrics endpoint (`/api/metrics`).
- Config via config file/CLI flags (alternative to env vars).
- Backup/restore CLI (`backbone backup`, `backbone restore`).
- Structured logging to file/stdout with levels and rotation.
- Rate limiting + security hardening audit.

## Acceptance criteria

- Job queues survive restarts.
- Metrics endpoint scrapable by Prometheus.
- Backup/restore CLI round-trips data.
