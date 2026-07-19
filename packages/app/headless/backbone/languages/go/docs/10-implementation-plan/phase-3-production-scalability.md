# Backbone — Phase 3: Production Scalability

## Goal

Scale beyond a single SQLite instance.

## Deliverables

- Pluggable SQLite → Postgres backends.
- Clustered WebSocket/SSE fan-out via pub/sub broker.
- In-memory cache → Redis adapter.
- File storage → S3-compatible adapter.
- Auth → external OIDC/SSO adapters.
- Horizontal scaling + leader election for cron/webhooks.

## Acceptance criteria

- Postgres backend passes the same test suite as SQLite.
- WS/SSE fan-out works across multiple instances.
