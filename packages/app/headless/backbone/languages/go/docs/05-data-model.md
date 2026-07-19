# Backbone — Data Model

## 1. Purpose

This document describes the schema, constraints, and state transitions that Backbone persists in SQLite.

All persistence lives in `internal/store`. The database is a single SQLite file at `$BACKBONE_DATA/data.db` (default `~/.backbone/`).

## 2. Core Entities

| Entity             | Table                  | Description                            |
| ------------------ | ---------------------- | -------------------------------------- |
| Users              | `users`                | Registered users (bcrypt passwords)    |
| Collections        | `collections`          | Dynamic JSON schema collections        |
| Records            | `records`              | Records within collections             |
| Buckets            | `buckets`              | File buckets                           |
| Files              | `files`                | Uploaded files                         |
| Webhooks           | `webhooks`             | Webhook endpoints                      |
| Webhook Logs       | `webhook_logs`         | Delivery attempts                      |
| Secrets            | `secrets`              | AES-256-GCM encrypted values           |
| Cron Jobs          | `cronjobs`             | Scheduled jobs                         |
| Cron Run Logs      | `cronjob_run_logs`     | Per-job run results                    |
| Logs               | `logs`                 | Structured log entries                 |
| Notifications      | `notifications`        | User notifications                     |
| PubSub Topics      | `pubsub_topics`        | Pub/sub topics                         |
| PubSub Messages    | `pubsub_messages`      | Published messages                     |
| WS Connections     | `ws_connections`       | Active WebSocket connections           |
| WS Messages        | `ws_messages`          | Message history                        |
| Cache              | `cache`                | Persisted TTL cache entries            |
| Permissions        | `permissions`          | Role↔collection access                 |

## 3. Schema Conventions

- All entities use public ID generation (`internal/id`).
- Timestamps stored as ISO 8601 UTC.
- JSON columns used for dynamic schemas and record data.
- Column migrations run on schema updates via `store.MigrateDB`.

## 4. State Transitions

| Entity     | States                                | Transition trigger          |
| ---------- | -------------------------------------- | --------------------------- |
| Cron Job   | scheduled → running → completed/failed | Scheduler / manual `/run`   |
| Notification | unread → read                         | User marks as read          |
| Webhook    | pending → delivered/failed             | Delivery attempt            |
| WS Connection | connected → disconnected              | Client connect/disconnect   |

## 5. Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- API: [`06-api-specification.md`](06-api-specification.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
