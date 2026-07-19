# Google Design System (Material Design 3): Basic Usage

Build web/app UI on an inherited, opinionated design system (Material Design 3 / Google) instead of inventing tokens from scratch. Covers color roles, type and shape scales, elevation, state layers, motion tokens, Tailwind v4 + DaisyUI 5 wiring, and where divergence must be declared. Use when starting a new app, choosing between borrowing a system and deriving one, or reviewing UI that drifts from its own design system.

## Scenario

Use this example as a starting point when applying **google-design-system** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Wire Roles Into Tokens** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```css
@theme {
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
}

[data-theme='exibit-light'] {
  --surface: oklch(99% 0.004 264);
  --on-surface: oklch(21% 0.012 264);
  --surface-variant: oklch(95% 0.006 264);
  --on-surface-variant: oklch(45% 0.014 264);
  --primary: oklch(48% 0.15 264);
  --on-primary: oklch(99% 0.004 264);
  --outline: oklch(72% 0.01 264);
  --error: oklch(52% 0.19 27);
}

/* dark: same role names, different values */
[data-theme='exibit-dark'] {
  --surface: oklch(21% 0.012 264);
  --on-surface: oklch(95% 0.006 264);
  --surface-variant: oklch(28% 0.014 264);
  --on-surface-variant: oklch(74% 0.012 264);
  --primary: oklch(80% 0.11 264);
  --on-primary: oklch(24% 0.06 264);
  --outline: oklch(48% 0.01 264);
  --error: oklch(70% 0.16 27);
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
