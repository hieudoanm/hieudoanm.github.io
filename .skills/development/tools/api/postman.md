---
name: postman-best-practices
description: Best practices for Postman — collections and environments as code, variables and scoping, contract testing with schema validation, and CI-friendly Newman runs. Use when designing, organising, or automating API testing.
---

# Postman

Postman is the dominant API client, and its serious mode is **treating a collection as a checked-in artefact and a request as an executable specification**. Its common failure mode is the opposite: collections that live in someone's account, environments with values set by hand, and a "documented" API nobody can run. Practical Postman work is about **getting the collection and environments into the repository, using variables with a deliberate scope, and turning the collection into a test that fails CI when the contract breaks**. REST client alternatives are in [insomnia.md](./insomnia.md) and [bruno.md](./bruno.md).

_Verified against Postman's 2026 releases; the desktop app and the agentic/API features move quickly, the collection format and scoping rules are stable._

---

## 1. Collections in the Repository

- **The collection is code: commit it.** A Postman collection exported to JSON in the repo is reviewable, diffable, and versioned with the API. A collection in an account is neither.
- **Commit a collection, its environments, and a README** in one folder (`postman/`), with the environments' *templates* committed and the real values in a gitignored file.
- **Postman supports a Git sync and CLI (`newman`); use one of them** so an update is a pull request rather than a message in a channel.
- **One collection per bounded context, not one giant collection.** A collection for `users` and one for `billing` can be run independently; a single 400-request collection cannot.
- **Order matters within a collection** for dependent requests, and folder structure is how you express the API's resource hierarchy. A flat list of 200 requests is a documentation problem, not a testing one.

---

## 2. Variables and Scoping

- **Scopes, from widest to narrowest: global, collection, folder, request.** The same name at two scopes is a debugging nightmare; use the narrowest scope that works.
- **Initial values belong in the environment template; secrets never belong in a committed file.** A token pasted into a committed environment JSON is an incident.
- **Use `{{variable}}` interpolation sparingly and visibly** — a request with eight interpolations is unreadable and impossible to review.
- **A `pre-request` script that sets a token is a pattern worth having in exactly one place.** Duplicate it per request and you will have eight copies that drift.
- **Test scripts are where assertions live,** so a request is self-checking; scripts in a separate place are documentation that drifts from the requests.

```json
{
  "name": "Staging",
  "values": [
    { "key": "baseUrl", "value": "https://staging.example.com", "enabled": true },
    { "key": "userId", "value": "", "enabled": true }
  ]
}
```

---

## 3. Making the Collection a Test

- **Assert on status, content type, and schema, not just a 200.** A 200 returning an error body is the most common false pass in API testing.
- **Use a JSON Schema in the response test** so a shape change fails loudly. This is where a collection becomes a contract test rather than a smoke test.
- **Chain dependent requests deliberately** — create, then read the created id, then update, then delete — and make the cleanup run even when an assertion fails, or your test data leaks into staging.
- **Negative cases are the valuable half.** A collection that only tests the happy path is documentation.
- **`newman` in CI runs the collection headlessly** and is the thing that makes a collection a test rather than a manual tool. Wire it to the API's own CI, not to a laptop.

```javascript
pm.test('returns the user schema', () => {
  pm.response.to.have.status(200);
  pm.response.to.be.json;
  pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
  // schema validation against the OpenAPI-derived schema
  validateResponse(pm.response.json(), 'User');
});

pm.test('rejects an unknown field', () => {
  // negative case, in the same collection
});
```

---

## 4. Documentation & Contracts

- **Postman can generate docs from a collection, but the OpenAPI spec is the contract of record.** A collection generated from a spec stays in sync; a hand-written collection documents what someone remembered.
- **Import the OpenAPI document and generate the collection** rather than transcribing endpoints — a generated collection that someone has edited by hand is now a fork with no owner.
- **Use the mock service for frontend development,** generated from the same spec, so a frontend is not blocked on a backend that does not exist yet.

---

## 5. CI & Automation

- **`newman` for the headless run; keep the command in the repo** (`package.json` script) so it is reproducible and the invocation is reviewable.
- **Fail the pipeline on a failed assertion,** and treat a collection that no one runs as documentation.
- **Point CI at a dedicated environment with seeded data** — a collection that mutates shared staging is a race condition, not a test.
- **Version the environment per deploy** if the API has one, and pin the collection to the API version it tests.

---

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
