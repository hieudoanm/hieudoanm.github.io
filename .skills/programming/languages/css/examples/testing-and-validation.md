# Css: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Reset/base layer: `box-sizing: border-box`, spacing/typography normalization.
- [ ] Define custom properties (colors, spacing, radii, type scale) in `:root`.
- [ ] Build responsive layout (Grid/Flexbox + media/container queries).
- [ ] Add dark theme + reduced-motion support.
- [ ] Verify accessibility: contrast, focus-visible, semantic, hit target sizes.
- [ ] Run `stylelint`; check with lighthouse/sample perf run.
- [ ] Keep specificity flat; avoid `!important` and inline styles.

## Example

A team applying **Quick-Start Checklist** to a Css project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Reset/base layer: `box-sizing: border-box`, spacing/typography normalization.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for css.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
