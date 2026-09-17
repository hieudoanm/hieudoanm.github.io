# Flutter Best Practices: Validation Plan

Use this plan to verify work guided by [Flutter Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Dart and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Unit-test behavior via services/repos** — contracts (success/failure/empty/cancellation) not widget internals
- [ ] **WidgetTester for widget tests** — pump, interact, assert rendered state:
- [ ] **IntegrationTest for critical user journeys on device/CI** — main flows, not every screen
- [ ] **Fakes at injection boundaries** (Provider overrides, Repo fakes); never mock the framework
- [ ] **Deterministic time** — no real sleeps; pump with explicit durations
- [ ] **Profile before optimizing** — flutter run --profile + DevTools; most "performance" is constraint/scroll/rebuild fixes first
- [ ] **const reducer discipline + ListView.builder** avoid rebuild storms — the two biggest wins
- [ ] **RepaintBoundary for expensive isolated paints**; never for the whole screen
- [ ] **Image handling** — cachedNetworkImage, decode at rendered size, ResizeImage for in-memory savings
- [ ] **AnimatedBuilder over whole-tree animations**; scope rebuilds to the animating subtree

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
