# D3 Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Selection chain explicit; one element type per join
- [ ] `enter`/`update`/`exit` implemented with a stable key
- [ ] Scales (`time`/`linear`/`band`) + margin groups structured
- [ ] Axes via `d3.axis*`; ticks formatted
- [ ] Events via `pointer`; zoom/drag composed as behaviors
- [ ] Dense-data switch to canvas; geometry mutated, not re-stringed

## Example

A team applying **Quick-Start Checklist** to a D3 Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Selection chain explicit; one element type per join**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for d3-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
