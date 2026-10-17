# Backbone — Security Operations

## Principles

- Single static binary; no runtime server dependency.
- Never commit secrets, credentials, or API keys to the repository.
- JWT validated on every protected endpoint.
- Secret values encrypted with AES-256-GCM at rest; list omits values.
- Webhooks signed with HMAC-SHA256 when a secret is configured.
- Rate limiting per IP (token bucket).
- No stack traces or credentials in errors or logs.

## Checklist

- [ ] `JWT_SECRET` is not the dev default in production.
- [ ] `BACKBONE_SECRETS_KEY` is set or the key file is protected.
- [ ] Source contains no secrets.
- [ ] `bin/` is gitignored (build output).
- [ ] Docker image is `scratch` (no shell, no OS layer).

## Incident response

If a secret is accidentally committed:

1. Rotate the exposed secret (`JWT_SECRET`, `BACKBONE_SECRETS_KEY`).
2. Remove it from history (rewrite or `git filter-repo`).
3. Re-encrypt affected secrets if `BACKBONE_SECRETS_KEY` changed.
