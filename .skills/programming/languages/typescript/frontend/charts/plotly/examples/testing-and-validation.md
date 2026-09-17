# Plotly.js Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Typed traces (name/mode/color); layout structured
- [ ] `Plotly.react`/`restyle` for updates; no full redraws
- [ ] `scattergl`/WebGL for large series; down-sampled first
- [ ] Config gates toolbar/responsive; modeBar trimmed
- [ ] `plotly_click/hover/selected` handlers; listeners cleaned
- [ ] Version pinned; bundle lean; browser WebGL verified

## Example

A team applying **Quick-Start Checklist** to a Plotly.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Typed traces (name/mode/color); layout structured**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for plotly-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
