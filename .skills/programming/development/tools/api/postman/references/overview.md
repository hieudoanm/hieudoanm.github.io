# Overview

Focused reference for **postman-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Postman

Postman is the dominant API client, and its serious mode is **treating a collection as a checked-in artefact and a request as an executable specification**. Its common failure mode is the opposite: collections that live in someone's account, environments with values set by hand, and a "documented" API nobody can run. Practical Postman work is about **getting the collection and environments into the repository, using variables with a deliberate scope, and turning the collection into a test that fails CI when the contract breaks**. REST client alternatives are in insomnia.md and bruno.md.

_Verified against Postman's 2026 releases; the desktop app and the agentic/API features move quickly, the collection format and scoping rules are stable._

---

## 1. Collections in the Repository

- **The collection is code: commit it.** A Postman collection exported to JSON in the repo is reviewable, diffable, and versioned with the API. A collection in an account is neither.
- **Commit a collection, its environments, and a README** in one folder (`postman/`), with the environments' *templates* committed and the real values in a gitignored file.
- **Postman supports a Git sync and CLI (`newman`); use one of them** so an update is a pull request rather than a message in a channel.
- **One collection per bounded context, not one giant collection.** A collection for `users` and one for `billing` can be run independently; a single 400-request collection cannot.
- **Order matters within a collection** for dependent requests, and folder structure is how you express the API's resource hierarchy. A flat list of 200 requests is a documentation problem, not a testing one.

---
