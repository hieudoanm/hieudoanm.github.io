# Review checklist

Focused reference for **postman-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## General Rules of Thumb

- Collection and environments committed in the repo; secrets never in a committed file.
- Narrowest variable scope that works; a token-refresh script in one place only.
- Assert status, content type, and schema; chain dependent requests and clean up on failure.
- Test negative cases — the happy path alone is documentation.
- Generate the collection from the OpenAPI spec; hand-edits create an unowned fork.
- `newman` in CI against seeded, dedicated data; an unrun collection is not a test.

---

## Quick-Start Checklist

- [ ] Collection exported to JSON and committed, one per bounded context
- [ ] Environment templates committed; real values gitignored
- [ ] No token or secret in any committed environment file
- [ ] Variable scopes reviewed; no shadowed names
- [ ] Token-refresh pre-request script defined once, not per request
- [ ] Every request asserts status, content type, and JSON schema
- [ ] Negative cases present in each resource folder
- [ ] Dependent requests chained with cleanup that runs on failure
- [ ] Collection generated from the OpenAPI spec, not transcribed
- [ ] `newman` run in CI against dedicated seeded data
- [ ] CI fails on a failed assertion
- [ ] Mock service used for frontend work where the backend is not ready
