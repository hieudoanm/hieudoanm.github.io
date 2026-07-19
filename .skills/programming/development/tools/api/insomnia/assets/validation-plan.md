# Insomnia: Validation Plan

Use this plan to verify work guided by [Insomnia](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Write tests in the request's test tab,** so each request is self-checking, the way it should be
- [ ] **Assert on status, content type, and schema, not just a 200** — a 200 with an error body is the classic false pass
- [ ] **Chain dependent requests deliberately** and clean up in a finally-style teardown so a failed assertion does not leak test data
- [ ] **Use schema validation** against the design resource's schema, which makes the design the contract the tests enforce
- [ ] **Include negative cases.** A suite that only tests the happy path is documentation
- [ ] **Run the suite headlessly in CI** (the insomnia CLI / the exported test runner) so the collection is a test rather than a manual tool; keep the command in the repo

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
