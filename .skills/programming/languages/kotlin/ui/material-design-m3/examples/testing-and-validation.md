# Material Design 3: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Add `material3` dependency; wrap app in `MaterialTheme`.
- [ ] Define `ColorScheme` (dynamic where available + fallback) and typography/shape.
- [ ] Ensure dark theme objectivity (`darkColorScheme()`).
- [ ] Migrate components from M2 to M3; avoid mixing libraries.
- [ ] Verify dynamic color fallback on API < 31.
- [ ] Check contrast/accessibility and touch-target sizes.
- [ ] Test tonal overlays and elevation rendering across surfaces.

## Example

A team applying **Quick-Start Checklist** to a Material Design 3 project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Add `material3` dependency; wrap app in `MaterialTheme`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for material-design-m3.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
