# PHP Best Practices: Validation Plan

Use this plan to verify work guided by [PHP Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Php and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Treat all input as hostile until validated** — HTTP params, headers, uploaded files, deserialized JSON:
- [ ] **Output escaping is the inversion** — htmlspecialchars($data, ENT_QUOTES), or template-escape layer for view output. Never trust "userland said it's text"
- [ ] **SQL via parameterized queries/CDB only** — PDO::prepare/bind or an ORM; string interpolation into SQL is the #1 CVE
- [ ] **Passwords: password_hash/password_verify (bcrypt/argon2) over hand-rolled hashing.**
- [ ] **Uploads** — serve from a non-executable location or validate mime against an allowlist; never trust extensions
- [ ] **Secrets in env/.env only, never in code or committed config.**
- [ ] **PHPUnit for contracts** — behavior (success, validation, 404, empty, cancellation), not implementation internals:
- [ ] **Data providers for table-driven cases** — input × expected rows, attribute-style #[DataProvider]:
- [ ] **Fakes at interfaces (constructor-injected repos) over mock-everything** — the seam dictates the test
- [ ] **Database tests** — per-test transactions/RefreshDatabase-style isolation; no shared mutable fixtures

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
