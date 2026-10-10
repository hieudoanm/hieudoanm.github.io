# Bruno: Validation Plan

Use this plan to verify work guided by [Bruno](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Assertions live in the request file's test script,** so each request is self-checking and the suite is the collection
- [ ] **Assert on status, content type, and schema, not just a 200.** A 200 with an error body is the classic false pass, and it is the single most valuable assertion to add first
- [ ] **Use schema validation** so a shape change fails loudly instead of silently passing a status === 200 check
- [ ] **Chain dependent requests deliberately** — create, read the id, update, delete — and clean up so a failed assertion does not leak data
- [ ] **Include negative cases.** A suite of happy paths is documentation
- [ ] **Use bru run (the CLI) in CI,** keeping the command in the repo, so the collection is a test rather than a manual tool

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
