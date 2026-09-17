# Backbone — FEATURE-11: Encrypted Secrets

## 1. Summary

Secret values encrypted with AES-256-GCM at rest.

## 2. Behaviour

- `internal/secrets` — encrypt/decrypt + key management.
- Key loaded from `BACKBONE_SECRETS_KEY`, else persisted to `<dataDir>/secrets.key`.
- List omits values; single GET decrypts.

## 3. Acceptance criteria

- Stored secret values are not plaintext in SQLite.
- GET decrypts and returns the value; LIST omits values.
- Key rotation via `BACKBONE_SECRETS_KEY` env var.
