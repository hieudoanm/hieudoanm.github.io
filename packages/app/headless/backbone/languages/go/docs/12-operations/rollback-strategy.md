# Backbone — Rollback Strategy

## Rollback

Because Backbone is a single static binary with SQLite state, rollback is:

1. Re-deploy the previous binary version.
2. Restore the `~/.backbone/` data directory to the pre-change backup (if schema changed).
3. Restart the service.

Alternatively, redeploy the previously built binary artifact directly.

## Acceptance criteria

- The previous site/backend version can be redeployed from the retained binary artifact.
- Rollback does not require a runtime rollback (single process).
