# Implementation notes

Focused reference for **insomnia-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Tests

- **Write tests in the request's test tab,** so each request is self-checking, the way it should be.
- **Assert on status, content type, and schema, not just a 200** — a 200 with an error body is the classic false pass.
- **Chain dependent requests deliberately** and clean up in a `finally`-style teardown so a failed assertion does not leak test data.
- **Use schema validation** against the design resource's schema, which makes the design the contract the tests enforce.
- **Include negative cases.** A suite that only tests the happy path is documentation.
- **Run the suite headlessly in CI** (the `insomnia` CLI / the exported test runner) so the collection is a test rather than a manual tool; keep the command in the repo.

---

## 5. Organisation

- **One collection per bounded context,** ordered as folders mirroring the resource hierarchy. A flat list of 200 requests is a documentation problem.
- **Name requests after the operation and the resource** (`POST /users`, `GET /users/{id}`), so a failing test names itself.
- **Use a workspace for shared collections and a private one for scratch work,** so an experiment does not end up in the team's synced collection.
- **Keep the mock definitions in the repository** if a consumer depends on them; a mock that exists only in someone's account is a hidden dependency.
