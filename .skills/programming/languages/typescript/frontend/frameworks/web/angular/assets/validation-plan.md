# Angular Best Practices: Validation Plan

Use this plan to verify work guided by [Angular Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **OnPush change detection** — use OnPush for better performance
- [ ] **TrackBy in ngFor** — use trackBy for efficient list rendering:
- [ ] **Lazy loading** — lazy load feature modules and components
- [ ] **Virtual scrolling** — use CDK virtual scroll for long lists:
- [ ] **Unit tests** — test components and services:
- [ ] **Integration tests** — test component interactions
- [ ] **E2E tests** — use Protractor or Cypress for end-to-end testing

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
