# SwiftUI Best Practices: Validation Plan

Use this plan to verify work guided by [SwiftUI Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **#Preview everywhere a view changes** — device-variant, dark-mode, and state-driven snapshots:
- [ ] **Preview data via fixtures/fakes** — deterministic, small, named (User.cardFixture)
- [ ] **Preview the state machine**: .init, .loading, .loaded, .error each get a preview
- [ ] **Never block a preview on real networking; inject a fake seam.**
- [ ] **Unit-test models/services** (state transitions, validation, error mapping) — the framework's concerns excluded:
- [ ] **ViewInspector/XCTest UI probes only where interaction logic matters** — keep the bulk of coverage in logic and data transforms
- [ ] **Snapshot/visual regressions only for genuinely fragile chrome** — fast, deterministic, CI-friendly
- [ ] **Deterministic async** — async/await with injected fakes; no sleep
- [ ] **Profile with Instruments before optimizing** — the usual suspects: whole-subtree re-renders, image re-decoding, ZStack overdraw
- [ ] **Equatable + stable identity reduce re-render churn; @Bindable/@Observable scoped reads limit invalidation.**

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
