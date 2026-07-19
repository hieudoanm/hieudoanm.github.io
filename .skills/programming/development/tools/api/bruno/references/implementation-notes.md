# Implementation notes

Focused reference for **bruno-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
