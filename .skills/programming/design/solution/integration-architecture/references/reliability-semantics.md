# Reliability Semantics

Specify deadlines, acknowledgement meaning, retry owner, retry limit, backoff, idempotency key, ordering scope, and duplicate behavior. “Exactly once” claims require scrutiny across storage and side effects; prefer explicit at-least-once handling with idempotent processing when appropriate.

For asynchronous work, define queue capacity, retention, visibility timeout, poison-message handling, replay safety, and dead-letter ownership. For synchronous calls, propagate a bounded deadline and avoid retrying non-idempotent operations without protection.

Plan reconciliation for lost, delayed, or conflicting state. Define what the user or operator sees during partial failure and how recovery is verified.
