# Recharts Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Consistent `data` keys + typed arrays across charts
- [ ] Chart composited from primitives; shell reused per layout
- [ ] `ResponsiveContainer` with resolvable parent height
- [ ] `Tooltip`/legend configured; `accessibilityLayer` where SR matters
- [ ] `isAnimationActive:false` for bulk; memoized chart children
- [ ] Data aggregated; version pinned; tests snapshot chart behavior

## Example

A team applying **Quick-Start Checklist** to a Recharts Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Consistent `data` keys + typed arrays across charts**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for recharts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
