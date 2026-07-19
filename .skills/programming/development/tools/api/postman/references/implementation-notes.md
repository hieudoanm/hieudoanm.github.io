# Implementation notes

Focused reference for **postman-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
