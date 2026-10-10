# Vitest Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Vitest Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `vitest.config.ts` with `environment` + `coverage.thresholds`; aliases inherited from Vite
- [ ] `describe`/`it` sentences; `toEqual`/`toMatchObject`/`toThrow` matchers
- [ ] `vi.mock`/`vi.spyOn` at boundaries; `mockResolvedValueOnce` per test; mocks cleared
- [ ] `vi.useFakeTimers`/`advanceTimersByTime` for time logic
- [ ] `vitest run` + coverage gate in CI; shards for parallel
- [ ] Browser mode (or jsdom+TL) for DOM tests; no sleeps/`.only` shipped

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
