# Tauri Best Practices: Validation Plan

Use this plan to verify work guided by [Tauri Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Least privilege** — only expose necessary commands to frontend
- [ ] **Validate input** — validate all input from frontend in Rust commands:
- [ ] **File system access** — use Tauri's file system APIs with proper permissions
- [ ] **Disable dangerous features** — disable shell access, file system access if not needed
- [ ] **Content security policy** — configure CSP in tauri.conf.json
- [ ] **Unit tests** — test Rust commands with standard Rust testing:
- [ ] **Integration tests** — test frontend-backend integration
- [ ] **E2E tests** — use Tauri's testing utilities for end-to-end testing

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
