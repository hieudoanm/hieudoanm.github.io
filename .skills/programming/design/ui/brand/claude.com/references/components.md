# Claude components

(v) = from verified tokens or page text; (p) = proposed. Tokens are in `tokens.css`; use `hsl(var(--token))`.

## Nav (v structure, p style)

Height `--header-h`, background `--bg-100`, bottom hairline. Left: wordmark with a `✻` glyph in `--accent-brand`. Center/left: Product, Developers, Enterprise, Resources (each opens a mega-menu panel of link columns), Pricing. Right: "Login" text link, "Contact sales" outline button. Mobile: collapse to a "Menu" button.

## Hero (v copy, p layout)

Two columns on desktop: text left, looping muted video right (rounded 16px frame, hairline border). Headline "Think fast, build faster" in serif at `--fs-hero`; subhead "Brainstorm in chat, build in Cowork." in `--text-200`. Stacks on mobile with text first.

## Sign-up block (v)

A `.card` (max ~420px) with stacked full-width controls:

1. `.btn` "Continue with Google"
2. divider row: hairline, "or", hairline
3. text input for email plus `.btn--primary` "Continue with email"
4. `.btn` "Continue with SSO"
5. small print (`--fs-small`, `--text-400`): privacy acknowledgement and an opt-in checkbox line for promotional emails.

## Segmented toggle (v labels, p style)

Pill container with two options "Individual" and "Team and Enterprise"; selected option has `--bg-000` fill with a hairline, container `--bg-300`. Use `role="tablist"`.

## Plan card (v content, p style)

`.card` with 32px padding, 16px radius. Order: plan name (h3), price (large serif) with unit "/ month" and billing note, one-line audience, primary button, divider, checklist using `✓` glyphs. Free = "$0 / Free for everyone", Pro = "$17 per month billed annually ($200 up front) or $20 monthly / For everyday productivity", Max = "From $100 / 5-20x more usage than Pro". Highlight one plan with a stronger border, or a small clay badge, not a shadow.

## Badge (p)

Pill, `--bg-300` fill, `--text-200` text, 13px. Clay variant: soft clay tint background with `--accent-main-000` text (use `hsl(var(--accent-brand) / 0.12)`).

## FAQ (v content)

Accordion using `<details>`; question in serif 22px, hairline between items, `+` / `−` glyph on the right. Three questions on the page.

## Footer (v)

Wide multi-column link list (Products, Capabilities, Extensions, Models, Enterprise, Departments, Industries, Programs, Developers, Platform, Resources, Help and security, Company, Terms and policies). Column headings in `--text-000` 14px medium, links `--text-300`. Bottom bar: "© 2026 Anthropic PBC", social text links, language select.

## Accessibility

- Body text `--text-200` on `--bg-100` passes contrast; `--text-400` is for captions only.
- Check clay-on-light for text: use `--accent-main-000` (the emphasized clay) for text and reserve `--accent-brand` for fills and glyphs.
- Toggle, accordion and menus need keyboard operation and the visible focus ring defined in `tokens.css`.
