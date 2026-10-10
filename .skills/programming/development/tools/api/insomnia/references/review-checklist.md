# Review checklist

Focused reference for **insomnia-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
