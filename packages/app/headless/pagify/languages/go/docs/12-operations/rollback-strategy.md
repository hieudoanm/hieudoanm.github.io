# pagify — Rollback Strategy

## Rollback

Because `dist/` is reproducible from source, rollback is:

1. Revert the source Markdown (and `pagify.yaml`) to the previous version.
2. Re-run `pagify build ./docs`.
3. Redeploy the previous `dist/` to the static host.

Alternatively, redeploy the previously built `dist/` artifact directly.

## Acceptance criteria

- The previous site version can be redeployed without re-building from source if the `dist/` artifact is retained.
- Rollback does not require a runtime rollback (no backend).
