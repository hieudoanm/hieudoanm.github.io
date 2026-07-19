# ArtCraft components

Structure and copy are observed on getartcraft.com. Visual values come from `tokens.css` and are proposed unless noted.

## Header

- Height `--header-h`, sticky, `--bg` background with a bottom hairline.
- Left: icon (`artcraft-icon.svg` via `<img>`) + wordmark.
- Center/left links: Home, Image, Video, Resources (submenu: Download, Support, Craft Apps).
- Right: Pricing (text), Discord (text or glyph link), "Launch App" (`.btn--primary`).
- Mobile: hide links, show a text button "Menu" that toggles a full-width panel.

## Hero

- Oversized wordmark above or behind the headline (very large, low contrast, may bleed off the edge).
- `h1`: "Capable tools for artists." Lead paragraph below, max ~55ch.
- Actions: `.btn--primary` "Download free", `.btn--ghost` "Use on web", then a text link "Open source on GitHub ↗".
- Meta lines in `.eyebrow` style: "macOS · Windows · Web", "No subscription required".

## Ticker (marquee)

- A flex row of items, each `▪ Name`, duplicated once inside a track that animates `translateX(0 → -50%)` linearly and infinitely at `--marquee-speed`.
- Pause on hover is optional. Disable under reduced motion.

## Section header

```
<p class="eyebrow">01 / Crafting features</p>
<h2>The control that mere words cannot buy.</h2>
<p class="lead">Text prompting is neat, but artists crave control. ...</p>
```

Always: numbered eyebrow, sentence-case `h2` ending in a period, one supporting line.

## Feature row

- Two columns on desktop (text / video), alternating sides is optional; stacked on mobile.
- Text column: category tag (`.eyebrow`, e.g. "Worlds"), index "01", `h3`, description (1-2 sentences).
- Media column: `.frame` containing `<video autoplay muted loop playsinline>`.
- Seven topics on the site: Image to Location, Build scenes with depth, Precise layered control, Image to 3D Mesh, Mix every kind of asset, Character Posing, Background Removal.

## Strip link ("More in the app")

- Full-width bordered row: index `08`, domain in mono (`app.getartcraft.com`), bold "Launch the studio", one description sentence, whole row is a link with an arrow `→`.

## Ownership card

- `.card` with a letter badge (`A`, `B`, `C`) in mono, `h3`, one sentence, optional link. Three in a row on desktop.

## Proof tile

- `.frame` with a thumbnail, a centered "Play" pill, index `01`-`03` and an italic "Community film" caption.

## Closing CTA

- Centered block: eyebrow "Free to start · No subscription", `h2` "Start crafting.", one sentence, the two hero buttons.

## Footer

- Icon, one-line description ("The open-source studio for controllable AI image and video."), contact email.
- Link columns: Product, Craft Apps, Resources, Community.
- Bottom row: "© 2026 ArtCraft" left, "Made by artists, for artists" right.

## Accessibility notes

- Videos are decorative: `muted`, no controls, with surrounding text carrying the meaning.
- Keep contrast of `--text-muted` on `--bg` at or above 4.5:1; `--text-faint` is for non-essential labels only.
- Every interactive row or card has a visible focus ring (`outline: 2px solid var(--text); outline-offset: 3px`).
