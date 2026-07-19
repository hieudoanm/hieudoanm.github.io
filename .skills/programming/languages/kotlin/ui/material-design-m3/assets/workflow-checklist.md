# Material Design 3: Workflow Checklist

A practical run sheet for applying [Material Design 3](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Design tokens**: color, typography, and shape scales defined once and consumed everywhere
- [ ] 1. Core Concepts: **Color roles**: each component has semantic roles like primary, secondary, surface, surfaceVariant, error, with tonal-palette consistency built in
- [ ] 2. Setting Up in Compose: Dependencies: androidx.compose.material3:material3 (Jetpack Compose) — the M3 implementation
- [ ] 2. Setting Up in Compose: MaterialTheme(colorScheme, typography, shapes) composes the tokens; start with lightColorScheme()/darkColorScheme()
- [ ] 3. Color: Use **tonal palettes** — a color family ramp (0–100) where roles map to precise tones (primary = 40 light, primary dark = 80)
- [ ] 3. Color: Build a scheme with lightColorScheme() + a ColorScheme via lightColorScheme(primary = ...)
- [ ] 4. Typography: Scale: displayLarge → labelSmall; M3 emphasizes expressive big text with optical sizing
- [ ] 4. Typography: Use Typography() with MaterialTheme.typography.* shortcuts per style; configure under M3's Typography object
- [ ] 5. Shape: Shapes are **corner styles** (rounded, cut, squircle/pill) via Shapes() / ShapeDefaults
- [ ] 5. Shape: Component variants (Default, Small, Medium, Large, Full) via MaterialTheme.shapes.*:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
