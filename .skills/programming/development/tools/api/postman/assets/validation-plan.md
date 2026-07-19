# Postman: Validation Plan

Use this plan to verify work guided by [Postman](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Assert on status, content type, and schema, not just a 200.** A 200 returning an error body is the most common false pass in API testing
- [ ] **Use a JSON Schema in the response test** so a shape change fails loudly. This is where a collection becomes a contract test rather than a smoke test
- [ ] **Chain dependent requests deliberately** — create, then read the created id, then update, then delete — and make the cleanup run even when an assertion fails, or your test data leaks into staging
- [ ] **Negative cases are the valuable half.** A collection that only tests the happy path is documentation
- [ ] **newman in CI runs the collection headlessly** and is the thing that makes a collection a test rather than a manual tool. Wire it to the API's own CI, not to a laptop

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
