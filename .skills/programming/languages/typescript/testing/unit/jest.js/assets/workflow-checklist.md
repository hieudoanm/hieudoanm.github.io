# Jest Best Practices: Workflow Checklist

A practical run sheet for applying [Jest Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Structure & Naming: **describe per unit, nested describe per behavior, it one sentence:**
- [ ] 1. Structure & Naming: **One assertion-path per it; names read as mini-specs.**
- [ ] 2. Matchers: **toEqual deep; toMatchObject subset; toBe identity; toStrictEqual for stricter checks:**
- [ ] 2. Matchers: **toHaveBeenCalledWith, toThrow, toHaveLength, toBeTruthy — express intent.**
- [ ] 3. Mocking: **jest.mock("module") for module fakes; jest.spyOn(obj, "method") at seams:**
- [ ] 3. Mocking: **jest.fn() with mockResolvedValue/mockRejectedValue for async seams; mockReturnValue for sync.**
- [ ] 4. Fake Timers: **jest.useFakeTimers() for time-dependent logic — deterministic:**
- [ ] 4. Fake Timers: **jest.runAllTimers/advanceTimersByTime exact; useRealTimers() after.**
- [ ] 5. Coverage: **Coverage via --coverage/collectCoverageFrom; thresholds fail under gates:**
- [ ] 5. Coverage: **Coverage is a signal for gaps, not a vanity number** — untested branches/edges found by reading the report route back to tests

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
