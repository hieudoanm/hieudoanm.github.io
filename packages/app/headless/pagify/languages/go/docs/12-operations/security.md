# pagify — Security Operations

## Principles

- Generated sites contain no backend and no runtime server dependency.
- Never commit secrets, credentials, or API keys to the repository.
- `pagify serve` confines all file access to `--root` via `internal/workspace`.
- Generated HTML escapes Markdown content; raw HTML passthrough is opt-in.
- No stack traces or sensitive data in errors or logs.

## Checklist

- [ ] Source Markdown contains no secrets.
- [ ] `pagify.yaml` contains no secrets.
- [ ] CI does not log credentials.
- [ ] `dist/` output is not committed.

## Incident response

If a secret is accidentally committed:

1. Rotate the exposed secret.
2. Remove it from history (rewrite or `git filter-repo`).
3. Rebuild and redeploy affected sites.
