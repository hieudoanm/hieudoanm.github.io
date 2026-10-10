# App components (workspace UI)

Variables are `--app-*` and `--c-*` in `tokens.css`, scoped to `[data-app="notion"]`. (rnx) = react-notion-x stylesheet; (p) = proposed.

## Shell layout

Two-column CSS grid: `grid-template-columns: var(--app-sidebar-w) 1fr`, full viewport height, sidebar and main scroll independently. Collapse the sidebar under ~720px.

## Sidebar

- Background `--app-sidebar`, right edge has no border (tonal separation only).
- Top: workspace row (emoji or letter avatar 20px, name, `⌄`).
- Quick rows: Search, Home, Inbox, Settings; then sections labelled "Favorites", "Private", "Shared" in 12px, 500, `--app-fg-60`.
- Row: height ~28px, padding 0 8px, radius `--app-radius-row`, emoji icon + title, hover `--app-hover`, active `--app-hover` + weight 500. Tree toggle `▸` rotates 90 degrees when open; nested rows indent 16px. Row actions (`⋯`, `+`) fade in on hover but always reserve space.

## Topbar

Height `--app-topbar-h`, breadcrumb items as buttons (`🏠 Page / Sub page`) with hover fill, right side "Share", `☆`, `⋯`. No border, optional faint bottom hairline on scroll.

## Page

- Optional cover: 30vh, `object-fit: cover`, flush to the top.
- Icon: emoji ~78px, overlapping the cover by half; no cover means 80px top padding.
- Title: `--app-title-size`, 700, line-height 1.2 (rnx). Placeholder "Untitled" in `--app-fg-40`.
- Properties strip: label (`--app-fg-60`, 14px, ~160px wide) + value, hover fill per row.
- Content column `max-width: var(--app-page-w)`, centered, side padding `--app-page-pad` (24px on mobile).

## Blocks

Spacing: each block has ~3px vertical padding; headings add top margin (H1 2em, H2 1.4em, H3 1em).

- **Text**: 16px/1.5.
- **H1/H2/H3**: `--app-h1/2/3`, weight 600, line-height 1.3.
- **Bulleted / numbered list**: 24px indent, `•` or index as text glyph.
- **To-do**: 16px checkbox (CSS box, 2px `--app-fg` border, 3px radius; checked fills `--app-blue` with a `✓`); completed text gets `--app-fg-60` and line-through.
- **Toggle**: `<details>` with `▸` marker; children indented 24px.
- **Quote**: 3px left border `--app-fg`, 14px left padding, larger text (1.2em).
- **Callout**: padding `16px 16px 16px 12px`, radius 3px, 1px `--app-line` border (rnx), emoji icon at left, background from block palette (`--c-gray-bg` by default).
- **Divider**: 1px `--app-line`, 6px vertical margin.
- **Code**: `--app-mono`, 85% size, `--c-gray-bg` background, padding `30px 16px 30px 20px` (rnx), 3-6px radius.
- **Inline code**: mono, ~85%, `rgba(135,131,120,.15)` background, red text `#eb5757`, 3px radius (p).
- **Hover handle**: `+` and `⋮⋮` to the left of the block, 24px buttons, opacity 0 until the block is hovered.

## Database table view

Borderless: header row in `--app-fg-60` 14px with a property-type glyph (`Aa`, `#`, `◉`, `☰`, `📅`), 1px `--app-line` between rows, cell padding 6px 8px, row hover `--app-hover`. First column is the page title with its emoji. Select/multi-select values are pills: block-palette text on its `-bg`, 3px radius, 14px text, 2px 6px padding. Footer row "+ New" in `--app-fg-60`. View tabs above: `Table | Board | Calendar` as ghost buttons with the active one underlined by 2px `--app-fg`.

## Slash menu and popovers

White (`--app-bg`) card, radius `--app-radius-pop`, `--app-popover-shadow`, 8px inner padding, width ~320px, max-height ~330px with scroll. Group labels 12px `--app-fg-60`. Item: 28-44px row, 32px icon tile (hairline border, 3px radius) + title (14px) + description (12px `--app-fg-60`); hover or keyboard focus `--app-hover`. Show the typed filter in the first row, `Esc` closes.

## Selection and focus

Text selection `--app-selection`. Block selection: 3px radius, `rgba(35,131,226,.14)` wash (p). Focus ring: 2px `--app-blue`.

## Dark mode

Swap tokens only; prefer translucent tints for colored backgrounds. Do not pure-white the text: 81% white is the default body color (p).
