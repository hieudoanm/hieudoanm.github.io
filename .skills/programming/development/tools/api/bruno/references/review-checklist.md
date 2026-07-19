# Review checklist

Focused reference for **bruno-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## General Rules of Thumb

- The collection is plain files in the repo; commit it and review request changes as code.
- Environment templates committed, populated environments ignored; never a committed secret.
- Assertions in each request file: status, content type, schema — not just a 200.
- Negative cases included; dependent requests chained with cleanup that runs on failure.
- Reuse auth headers via the environment; a pre-request script in one place, not thirty.
- Generate from the OpenAPI spec for docs and mocks; the spec is the contract of record.
- `bru run` in CI against seeded data; an unrun collection is not a test.

---

## Quick-Start Checklist

- [ ] Collection committed in a dedicated folder, one folder per resource
- [ ] Environment templates committed; populated environments gitignored
- [ ] No token or secret in any committed file
- [ ] Variable scoping narrow: environment over collection over request
- [ ] Auth header reused via the environment, not repeated per file
- [ ] Every request asserts status, content type, and schema
- [ ] Negative cases present in each resource folder
- [ ] Dependent requests chained, with cleanup that runs on failure
- [ ] OpenAPI spec treated as the contract of record; docs/mocks generated from it
- [ ] `bru run` in CI against dedicated seeded data
- [ ] CI fails on a failed assertion
- [ ] Collection updated in the same PR as an API version change
- [ ] Scratch requests kept out of the shared collection
