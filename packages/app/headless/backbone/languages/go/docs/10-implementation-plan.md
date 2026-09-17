# Backbone — Implementation Plan

Phased delivery plan for Backbone.

## Phase plan

Phase 0 Foundation → Phase 1 Core modules → Phase 2 Reliability & ops → Phase 3 Production scalability → Phase 4 Ecosystem.

| Phase | Focus                                  | Status  |
| ----- | -------------------------------------- | ------- |
| 0     | Foundation (Go module, SQLite, HTTP)   | Shipped |
| 1     | Core modules (auth, base, files, real-time, webhooks, cron, secrets, pubsub, logs, notify, cache) | Shipped |
| 2     | Reliability & ops (queues, metrics, config, backup/restore) | Planned |
| 3     | Production scalability (Postgres, clustered WS/SSE, Redis/S3, OIDC, horizontal scaling) | Planned |
| 4     | Ecosystem (Kotlin parity, client SDKs, Terraform/Helm, hosted offering) | Planned |

The phase numbering below is canonical — see [`10-implementation-plan.md`](10-implementation-plan.md) for detailed phases.

## Cross-references

- Requirements: [`01-requirements.md`](01-requirements.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
- Deployment: [`11-deployment.md`](11-deployment.md)
