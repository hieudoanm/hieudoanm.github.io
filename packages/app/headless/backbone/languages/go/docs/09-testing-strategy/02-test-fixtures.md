# Backbone — Test Fixtures

Fixtures are synthetic and deterministic:

- Fresh `t.TempDir()` for `BACKBONE_DATA` per test.
- Synthetic users, collections, records, webhooks.
- Never commit real user data as fixtures.
