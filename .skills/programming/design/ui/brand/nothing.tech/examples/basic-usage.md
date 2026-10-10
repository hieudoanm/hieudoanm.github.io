# Nothing Design Language: Basic Usage

Build web/app UI in the Nothing (nothing.tech) design language — monochrome industrial restraint, Swiss/Colophon typography, dot-matrix motif, hairline structure, and one scarce accent. Covers the official palette and five typeface jobs, the three-layer hierarchy rule, spacing-as-meaning, the dot grid, motion and iconography, plus open substitutes for the proprietary fonts. Use when styling anything Nothing-inspired, matching Nothing OS or nothing.tech, or contrasting a brand-authored design system against an institutional one (see design/brand/google.md).

## Scenario

Use this example as a starting point when applying **nothing-design-system** to a small, representative task. It demonstrates the pattern shown in the skill’s **The budget** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```css
--display-xl: 72px/1/-0.03em; /* hero numbers, time */
--display-lg: 48px/1.05/-0.02em; /* section heroes, percentages */
--display-md: 36px/1.1/-0.02em; /* page titles */
--heading: 24px/1.2/-0.01em; /* section headings */
--subheading: 18px/1.3/0;
--body: 16px/1.5/0;
--body-sm: 14px/1.5/0.01em;
--caption: 12px/1.4/0.04em; /* timestamps, footnotes */
--label: 11px/1.2/0.08em; /* ALL CAPS mono, "instrument panel" */
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
