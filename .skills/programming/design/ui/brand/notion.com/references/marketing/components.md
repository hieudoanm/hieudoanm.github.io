# Marketing components (notion.com)

Variables are in `tokens.css` (`--m-*`). Structure and copy are observed; visual values are third-party or proposed (see SKILL.md).

## Nav

White, sticky, bottom hairline (`--m-border`). Left: text wordmark. Menus: Product (Capture, Find, Automate, What's New, Download), Resources (Enterprise, Small businesses, Startups, Developers, plus Discover/Learn lists), Pricing. Right: "Request a demo" (ghost/outline), "Log in" (text), "Get Notion free" (`.m-btn--primary`). Mega-menu panels are white cards, 12px radius, hairline border.

## Hero

Centered or left-aligned stack: H1 at `--m-fs-hero` weight 700, tracking -0.04em, line-height 1.05; one-sentence subhead (`--m-fs-body-lg`, `--m-text-muted`); two buttons (primary + outline). Below or beside: a looping muted video and a pile of overlapping product screenshots (rounded 12-16px, `--m-shadow-mockup`, slight rotation/offset allowed).

## Logo strip

Eyebrow-style sentence ("The most ambitious companies run on Notion"), then a row of monochrome logos at ~40% opacity. Use text wordmarks if real logos are unavailable.

## Feature block

Label (small, mono or caps) + H2 + 1-2 sentences + optional link, with a large screenshot card (`--m-surface` or white, 12px radius, hairline border, mockup shadow). Alternate sides or stack. Three blocks: Capture knowledge, Find answers (with citations), Automate busywork.

## Use-case cards

Grid 3 (then 2, then 1). Each card has a pastel tint background (`--m-tint-*`), a title, one line, and a small UI snippet. Tints categorize; do not use more than 3 per row.

## Testimonials

Quote text in serif (`--m-font-serif`, 22-32px, weight 400), attribution below with company wordmark. White or `--m-surface` card, hairline border.

## Stats band

Dark (`--m-dark-band`) or surface band, 3-5 big numbers (48px, 700) with small labels ("100M users", "50+ countries", "62% of Fortune 100").

## Pull quote

Full-width, centered serif at ~32px, generous vertical padding; attribution in small caps.

## Closing CTA and footer

Repeat the primary and secondary buttons. Footer: four-plus link columns, language selector, cookie settings, copyright; text 14px, `--m-text-muted`, hover `--m-text`.

## Buttons and inputs

Primary: `--m-brand` fill, white text, 8px radius, padding 12px 20px, 500 weight, hover `--m-brand-hover`. Ghost: `--m-brand-soft` fill, brand text. Input: 44px high, 6px radius, 1px `--m-border-input`, focus ring `0 0 0 3px rgba(0,117,222,.18)`.

## Accessibility

Check muted text (54% black) on tinted cards; go to 70% if contrast is under 4.5:1. Videos are decorative and muted. Menus and tabs must be keyboard-operable.
