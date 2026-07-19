# Backbone — Monitoring and Alerting

Backbone exposes a healthcheck endpoint for orchestration probing.

## Metrics

- `GET /api/health` returns `{"status":"ok"}` (unauthenticated).
- Docker healthcheck probes `GET /api/health`.
- Build success/failure (CI).
- Build duration.

## Alerts

- CI build failure.
- Docker healthcheck failure (container restart loop).
- Deploy failure (rolling release did not publish).

No runtime server metrics exist beyond the healthcheck; Prometheus endpoint is planned for Phase 2.
