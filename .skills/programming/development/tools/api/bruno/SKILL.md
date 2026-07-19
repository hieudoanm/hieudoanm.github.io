---
name: "bruno-best-practices"
description: "Best practices for Bruno — collections as plain files in the repository, environment variables, script-based assertions, and Git-native API testing without a cloud account. Use when designing, organising, or automating API requests and tests."
tags:
  - "programming"
  - "development"
  - "developer-tools"
  - "api"
  - "bruno"
when_to_use: "Use when designing, organising, or automating API requests and tests."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../insomnia/SKILL.md"
  - "../postman/SKILL.md"
  - "../../editor/cursor/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# Bruno

Bruno is an open-source API client whose defining choice is **a collection is a directory of plain text files in your Git repository** — no account, no sync service, no proprietary collection format. A request is a `.bru` file you read in a diff. Practical Bruno work is about **leaning into that property, keeping scripts small and reviewable, and treating the collection as a test suite**. Peers are in [postman.md](../postman/SKILL.md) and [insomnia.md](../insomnia/SKILL.md).

_Verified against Bruno's 2026 releases (v2.x). The `.bru` format and collection layout are stable; scripting follows Postman-compatible APIs with Bruno-specific additions._

---

## 1. Files in the Repository

- **The collection is a folder of `.bru` files in the repo** — committed, diffed, and reviewed like any other source. This is the reason to use Bruno over a client that stores collections in an account.
- **Keep it in a dedicated folder** (`bruno/` or `api/`) with the environments beside it, so the whole API surface is one reviewable path.
- **No account and no sync means no lock-in and no secrets in a vendor's database** — an environment file is a local, gitignored file with the real values.
- **Commit the environment templates; gitignore the populated ones.** A committed live token is an incident, as in any client.
- **A `.bru` file is small and readable, so use the folder hierarchy to mirror the API** — one folder per resource, files named for the operation.

```text
bruno/
  collection.bru
  environments/
    local.bru        # gitignored
    staging.bru      # template committed
  users/
    create-user.bru
    get-user.bru
  billing/
    list-invoices.bru
```

---

## 2. Requests and Variables

- **Declare variables in an environment file, interpolate with `{{var}}`,** and keep the scoping narrow: environment over collection over request.
- **Do not commit secrets.** The populated environment is local and ignored; the committed file is a template with placeholders.
- **Use pre-request scripts sparingly** — a token refresh in one place is a pattern; a pre-request script on every file is a maintenance problem.
- **A request file should be readable top to bottom:** method, URL, headers, body, tests. If the test block is a hundred lines, the logic belongs in a script or a shared module.
- **Reuse common headers via the environment or a collection-level file** rather than repeating an auth header in thirty files.

---

## 3. Tests

- **Assertions live in the request file's test script,** so each request is self-checking and the suite is the collection.
- **Assert on status, content type, and schema, not just a 200.** A 200 with an error body is the classic false pass, and it is the single most valuable assertion to add first.
- **Use schema validation** so a shape change fails loudly instead of silently passing a `status === 200` check.
- **Chain dependent requests deliberately** — create, read the id, update, delete — and clean up so a failed assertion does not leak data.
- **Include negative cases.** A suite of happy paths is documentation.
- **Use `bru run` (the CLI) in CI,** keeping the command in the repo, so the collection is a test rather than a manual tool.

```javascript
// create-user.bru — test block
test('creates the user', () => {
  expect(res.getStatus()).to.equal(201);
  expect(res.getHeader('content-type')).to.include('application/json');
  const body = res.getBody();
  expect(body).to.have.property('id');
  // schema validation against the API contract
});
```

---

## 4. Organisation & Docs

- **One folder per resource, named for the operation,** so a failing test names itself in the CI output.
- **Bruno can generate docs from a collection,** but the OpenAPI document remains the contract of record; generate from it rather than transcribing endpoints.
- **Use a mock collection for frontend work** where the backend is not ready, generated from the same spec, and commit the mock definitions if a consumer depends on them.
- **Keep scratch requests out of the shared collection** — a personal `.bru` file in the repo folder becomes everyone's problem.

---

## 5. Git Workflow

- **Branch and review request changes like code.** A new endpoint's request file is a small, reviewable diff, and reviewing it confirms the API shape.
- **A renamed or changed request is a breaking change to a contract** other people run; treat it with the same care as a schema change.
- **The collection version with the API:** when the API version changes, update the collection in the same PR, so the two never drift.
- **CI runs the collection on every PR** against a dedicated environment with seeded data, failing the build on a failed assertion.

---

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
