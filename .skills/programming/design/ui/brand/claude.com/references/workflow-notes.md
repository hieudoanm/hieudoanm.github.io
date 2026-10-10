# Workflow notes

Focused reference for **claude-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

## Design rules

- **Use the semantic tokens, not raw grays.** `--bg-000` is the page, `--bg-100`/`--bg-200` step toward raised or recessed panels, `--text-000` for headings, `--text-200` body, `--text-400` captions, `--border-*` at low alpha for hairlines. Dark mode just swaps the variable values.
- **Gray hue is always 60.** Never introduce cool grays or pure black text on pure white; it breaks the paper feel.
- **Clay is a seasoning.** Use `--accent-brand` for the logo glyph, a badge, a link underline or one emphasis per screen. The default primary button is the dark neutral (`--text-000` fill with `--bg-000` text). Pro uses violet and secondary uses blue only for product-tier badges, never as page color.
- **Hairlines over shadows.** 1px low-alpha borders, 12-16px radius on cards, no heavy shadows, no gradients except an optional very faint warm wash.
- **Serif headlines, sans UI.** Headline in a serif at light-to-regular weight, sentence case, no terminal period. Body and controls in a clean sans. If proprietary faces are unavailable, use Georgia for headlines and system-ui for the rest.
- **Generous, calm spacing.** Large vertical bands (about 96px) between sections, a narrow reading column for prose, a 1200px max container.
- **Full-width, plain buttons.** Auth options are stacked, equal-width, outlined buttons with a text label only (no logos drawn inline).
- **Icons.** Text glyphs (`✻`, `→`, `✓`, `+`) and CSS shapes. Do not inline SVG in generated code. Load logos as external image files or use a text wordmark.
- **Motion.** Short fades and translates (100-360ms); disable under `prefers-reduced-motion`.
- **Follow the OS theme** via `prefers-color-scheme`, scoping tokens on `:root` and optionally `[data-mode]` for a manual override.

## Voice

Calm, warm, capable, benefit-led. Headlines are short imperatives or paired phrases ("Think fast, build faster"). Plain feature lists, transparent pricing with honest caveats about usage limits. Buttons use verbs ("Try Claude", "Start building", "Continue with email"). Avoid hype, exclamation marks, "revolutionary", and fear-based urgency.

## How to use this skill

1. Copy `references/tokens.css` into the project; reference only the semantic variables.
2. Start from `assets/template.html` (hero, sign-up block, plans, FAQ, footer) and replace copy.
3. For single components read `references/components.md`.
4. Before finishing, run the Design rules checklist and tell the user which values were proposed rather than verified, and that the brand fonts were substituted.

## Files

- `references/tokens.css`: semantic color tokens (light and dark) from official values, plus proposed type, spacing, radius and base styles.
- `references/components.md`: component recipes.
- `assets/template.html`: single-file landing page template, no inline SVG, no external dependencies.
