# Chart.js Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `new Chart` once per canvas; `destroy()` on unmount
- [ ] `update()` mutation over recreate; `Chart.getChart` guarded
- [ ] Datasets with explicit label/colors/fill; palette centralized
- [ ] `scales`/`plugins` configured; responsive + sized parent
- [ ] Aggregation before render; `animation:false` for streams
- [ ] HiDPI toggled where sharpness matters

## Example

A team applying **Quick-Start Checklist** to a Chart.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `new Chart` once per canvas; `destroy()` on unmount**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for chart-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
