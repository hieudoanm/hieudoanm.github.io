# D3 Best Practices: 6. Performance

## Source guidance

This example applies the **6. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Bound SVG elements to data count (1,000–10k OK; 100k = canvas territory):**
- **Canvas/`d3-shape` + `d3-geo` for dense; avoid per-frame DOM diffing.**
- **Draw large paths (`d3.line`/`d3.geoPath`) once; update attributes only, not geometry text.**

## Example

A team applying **6. Performance** to a D3 Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Bound SVG elements to data count (1,000–10k OK; 100k = canvas territory):****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for d3-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
