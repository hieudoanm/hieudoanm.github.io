# Marketing components

Use these patterns for a confident, benefit-led product site. The provided brand descriptions are guidance; verify exact assets, wording, and colors with the user before claiming a pixel-accurate reproduction.

## Navigation and hero

- Use a compact header with grouped product/resource links, account actions, and one primary call to action.
- Make the hero explain the product in one heading and one short supporting sentence.
- Provide a clear primary action and a lower-emphasis secondary action; use descriptive link text.
- Treat video and product imagery as enhancements. Supply a poster, alt text, and a useful reduced-motion/static fallback.

## Feature storytelling

- Alternate short copy with product screenshots or mockups; preserve a consistent content width and spacing rhythm.
- Use pastel cards to distinguish categories, not as substitutes for text labels.
- Follow feature sections with customer proof, a compact stats band, and a short quote where appropriate.
- Keep the footer grouped by task and provide language, privacy, and cookie controls when the product needs them.

## Visual hierarchy

- Use a white canvas, near-black text, and one saturated blue for links and primary actions.
- Reserve dark bands and pastel tints for clear section boundaries. Keep text contrast accessible on every surface.
- Use large, tightly tracked marketing headlines but keep body copy readable and avoid overlong measure.
- Use `tokens.css`; do not load proprietary fonts without a license. Prefer the documented system fallbacks.

## Responsive and accessible behavior

- Collapse navigation into a labeled menu at narrow widths; preserve a visible keyboard focus indicator.
- Stack feature blocks and cards without changing their reading order.
- Ensure CTAs are keyboard operable, images have appropriate alternatives, and animation respects `prefers-reduced-motion`.
- Test at narrow and wide viewports, with zoom, and with reduced motion enabled.
