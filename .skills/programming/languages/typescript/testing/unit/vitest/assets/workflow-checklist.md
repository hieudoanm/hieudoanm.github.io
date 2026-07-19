# Vitest Best Practices: Workflow Checklist

A practical run sheet for applying [Vitest Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Config: **Lean on Vite config; vitest.config.ts overrides for the test env:**
- [ ] 1. Config: **environment matches the target** — node for pure logic, jsdom/happy-dom for DOM, environmentMatchGlobs per path
- [ ] 2. Structure & Matchers: **Jest-compatible describe/it/expect — same sentences, same optics:**
- [ ] 2. Structure & Matchers: **Matchers mirror Jest** — toEqual/toMatchObject deep, toThrow, toHaveBeenCalledWith, toContainEqual
- [ ] 3. Mocking: **vi.fn, vi.mock, vi.spyOn — boundary mocking at module seams:**
- [ ] 3. Mocking: **mockResolvedValueOnce/mockRejectedValueOnce for per-test scenarios; vi.clearAllMocks() in beforeEach.**
- [ ] 4. Watch & DX: **vitest starts a watch-mode dev loop (HMR-like) — the default DX win; CI uses vitest run.**
- [ ] 4. Watch & DX: **Coverage via --coverage (v8/istanbul providers) with coverage.thresholds.**
- [ ] 5. DOM & Browser Mode: **DOM: environment: "jsdom" (or happy-dom) + Testing Library examples with auto-cleanup.**
- [ ] 5. DOM & Browser Mode: **Browser-mode tests (@vitest/browser) run in a real browser — the happy middle between unit and E2E (real DOM, no WebDriver config).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
