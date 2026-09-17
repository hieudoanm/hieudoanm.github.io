# Backbone — FEATURE-09: Webhooks

## 1. Summary

Event-driven webhooks with HMAC signing and delivery logs.

## 2. Behaviour

- `internal/webhook` — event types (`record.*`, `collection.*`, `bucket.*`, `notification.*`, `log.*`, `secret.*`, `cronjob.*`, `pubsub.*`).
- Handlers dispatch through `Dispatch(eventType, payload)`.
- Optional `X-Webhook-Signature-256` HMAC-SHA256 signature when a secret is configured.
- Delivery attempts recorded in `webhook_logs`.

## 3. Acceptance criteria

- Webhook fires on configured events.
- HMAC signature verifiable by recipient.
- Failed deliveries logged in `webhook_logs`.
