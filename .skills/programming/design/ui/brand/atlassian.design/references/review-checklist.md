# Review checklist

Focused reference for **atlassian-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 10. Implementation

| Need                              | Line                              |
| --------------------------------- | --------------------------------- |
| Atlassian products and React apps | Atlaskit (`@atlaskit/*`)          |
| Jira/Confluence Forge apps        | Forge UI Kit                      |
| Brand assets and Atlassian markup | Brand kit (Orange DAM)            |
| New Atlassian-facing surfaces     | Atlassian Design System + Rovo UI |

- Atlaskit emits CSS custom properties in a `--ds-*` namespace. **Confirm the exact
  variable name in devtools** rather than hand-writing it; the generated set is
  large and the public token reference is the source of truth.
- The full token reference with values and descriptions lives in Atlassian's
  token reference list.
- Prefer building on Atlaskit primitives over assembling raw HTML for interactive
  components — keyboard and focus behavior is already handled.

---

## General Rules of Thumb

- Read the token name as a sentence; it is the usage contract.
- Change emphasis before adding a border or a background to separate things.
- Keep semantics in roles; accents are for expression only.
- Use `inverse` tokens on bold backgrounds, and `warning.inverse` on warning.
- Icons get a neutral background for state, not a color token.
- Use tokens for dark mode; do not map values by hand.
- Do not build on beta foundations such as radius.
- Verify 4.5:1 for body text and 3:1 for large text and essential UI, per theme.

---

## Quick-Start Checklist

- [ ] Correct role chosen (`brand`, `danger`, `warning`, …) before any value
- [ ] Correct property segment chosen (`background`, `text`, `border`, `icon`)
- [ ] Emphasis and state segments included in the token name
- [ ] Inverse tokens used on bold backgrounds
- [ ] Accent colors not used to carry semantic meaning
- [ ] Icon states use a neutral background, not an invented color
- [ ] Light and dark both verified, with tokens driving the values
- [ ] Contrast checked: 4.5:1 body text, 3:1 large text and essential UI
- [ ] Atlaskit primitives used for interactive components
- [ ] No dependency on beta foundations such as radius

---

## Sources

- Atlassian Design System — https://atlassian.design/
- Foundations index — https://atlassian.design/foundations/
- Color foundations and token anatomy — https://atlassian.design/foundations/color
- Color palettes (hex and RGBa) — https://atlassian.design/foundations/color/color-palette
- Accessibility — https://atlassian.design/foundations/accessibility
- All-tokens reference — https://atlassian.design/components/tokens/all-tokens
- Atlaskit — https://atlaskit.atlassian.com
- Brand kit — https://orangedam.atlassian.com/
