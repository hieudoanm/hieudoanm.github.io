# pagify — Disaster Recovery

## Scenarios

| Scenario                  | Recovery                                                 |
| ------------------------- | -------------------------------------------------------- |
| `dist/` deleted or corrupted | Re-run `pagify build ./docs` and redeploy             |
| Source Markdown lost      | Restore from backup, then rebuild and redeploy           |
| Static host unavailable   | Point DNS/CDN at an alternate static host serving `dist/`|

## Acceptance criteria

- Recovery time is bounded by the build time plus redeploy time.
- No data loss beyond the last source Markdown backup.
