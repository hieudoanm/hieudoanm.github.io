---
name: insomnia-best-practices
description: Best practices for Insomnia — Git-sync'd collections and environments as files, templating, request tests, and design-first API workflows. Use when designing, organising, or automating API requests and tests.
---

# Insomnia

Insomnia is an open-source API client with Git sync, a request designer, and test scripting on the same model as Postman. Its distinguishing feature is **designed API documents**: you can build a resource by describing its fields, and Insomnia derives the requests, environment variables, and mock responses from that description. Practical Insomnia work is about **keeping collections in Git as reviewable files, using the design-first workflow where it fits, and turning requests into executable tests**. Peers are covered in [postman.md](./postman.md) and [bruno.md](./bruno.md).

_Verified against Insomnia's 2026 releases (v11+). The Git-sync file layout and the design-first feature have been stable for several major versions._

---

## 1. Git Sync: Collections as Files

- **Insomnia is designed to live in Git** — a collection directory with YAML files per request, committed and reviewed like source. This is its main argument over a client whose collections live in an account.
- **Point Git sync at a dedicated folder in the repo** (`insomnia/`) and let the team work through it, so a request change is a pull request.
- **Environment files are committed with placeholder values; secrets are never committed.** A token in a committed environment file is an incident, exactly as in any client.
- **Enable sync for the workspace, not per collection,** so a new teammate gets everything by cloning and pointing at the repo.
- **Watch for merge conflicts on the collection index** — two people adding a request at once conflict in the collection file. This is the main practical cost of Git-backed collections; it is worth it, and it is a normal code-review-shaped problem.

---

## 2. Environments and Templating

- **Use environment variables with the `{{variable}}` syntax,** declared in an environment file per deployment, and keep the values in Git with secrets excluded.
- **Do not put a live token in a request body template**; use a pre-request script to refresh it in one place, as in [postman.md](./postman.md).
- **Keep environments minimal** — base URL, credentials reference, feature flags. An environment that mirrors every request parameter is a second source of truth.
- **Use the template helper for common values** (a base object, a timestamp) so a change to a shape is one edit rather than forty.

---

## 3. Design-First Workflow

- **Insomnia's design resources are its real differentiator:** define a resource's schema once, and Insomnia generates CRUD requests, environment variables, example payloads, and a mock response.
- **Design-first suits a greenfield API** where the shape is still being decided; a generated request set then documents the decision and tests it at the same time.
- **For an existing API, import the OpenAPI document** and edit the design from there; hand-editing generated requests creates a fork with no owner.
- **The mock server is the payoff** — frontend work proceeds against the design's mock, and the contract is enforced when the real service is ready.
- **A design is a specification, so it belongs in review.** Changes to a design resource are API changes and get the same scrutiny as any other interface change.

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

---

## General Rules of Thumb

- Collections and environments in Git via Git sync; secrets never committed.
- Use the design-first workflow for a greenfield API; import OpenAPI for an existing one.
- Treat a design resource as a specification and review it like one.
- Assert status, content type, and schema per request; include negative cases.
- Chain dependent requests and clean up even when an assertion fails.
- One collection per bounded context; one workspace for shared, one for scratch.
- Run the suite headlessly in CI; an unrun collection is not a test.

---

## Quick-Start Checklist

- [ ] Git sync enabled at the workspace level, pointing at a committed folder
- [ ] Environment files committed with placeholders; secrets excluded
- [ ] No token or secret in any committed environment or request
- [ ] Design resources created for a greenfield API, or OpenAPI imported
- [ ] Generated requests not hand-edited without updating the design
- [ ] Mock definitions committed if a consumer depends on them
- [ ] Every request asserts status, content type, and schema
- [ ] Negative cases present in each resource folder
- [ ] Dependent requests chained, with teardown that runs on failure
- [ ] Token refresh defined once, not per request
- [ ] Test suite run headlessly in CI, command committed
- [ ] Scratch work kept in a private workspace, out of the synced collection
