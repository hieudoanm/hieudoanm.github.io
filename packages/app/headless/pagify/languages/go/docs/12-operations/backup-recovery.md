# pagify — Backup and Recovery

## Backup

Back up the source Markdown directory and `pagify.yaml` (if present). The generated `dist/` directory is reproducible and should not be backed up.

```bash
tar -czf docs-backup.tar.gz ./docs pagify.yaml
```

## Recovery

1. Restore the source Markdown directory.
2. Run `pagify build ./docs`.
3. Redeploy `dist/` to the static host.

## Acceptance criteria

- A site can be fully reproduced from the backed-up source Markdown.
- Recovery does not depend on the previous `dist/` output.
