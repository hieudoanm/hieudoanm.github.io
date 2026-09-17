# Ruby Best Practices: Validation Plan

Use this plan to verify work guided by [Ruby Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Ruby and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **RSpec (or Minitest) on behavior** — contracts for success, failure, validation, not-found and edge sizes:
- [ ] **Fakes at constructor seams over mock-everything** — let(:repo) { fake_repo } injection keeps tests honest
- [ ] **subject/described_class for focus; shared_examples for cross-class contracts.**
- [ ] **Deterministic** — Random seeds, no sleeps, no ambient env; freeze time with timecop-style helpers
- [ ] **Run bin/rspec + bin/rubocop before "done"** — a red suite is a fail-fast signal

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
