# App components

Use these patterns for a document-first workspace UI. Measurements are proposed approximations, not verified Notion specifications; use `tokens.css` and adjust for the actual viewport.

## Workspace shell

- Place the workspace switcher, search, navigation, and page tree in a persistent sidebar.
- Use semantic navigation and native buttons; give icon-only actions accessible names.
- Keep row height and hit targets usable on touch screens. Make the sidebar collapsible at narrow widths.
- Reserve space for drag and add controls instead of shifting rows on hover. Keep keyboard focus visible.

## Page header and blocks

- Show breadcrumb, sharing/actions, page title, and properties in a predictable order.
- Keep long-form content in a readable centered column; allow tables and media to expand when useful.
- Represent blocks with semantic headings, lists, quotes, code, and tables. Do not use a generic `div` for interactive controls.
- Implement toggles with `<details>`/`<summary>` or an accessible disclosure pattern; expose expanded state to assistive technology.
- Use text glyphs or emoji for simple icons. Avoid inline SVG when following this skill.

## Database view

- Use a real table with a caption, column headers, and row headers where appropriate.
- Distinguish property types with both text and color; never rely on color alone.
- Keep row actions keyboard reachable. On small screens, provide a scroll region with an accessible label.
- Give create/edit actions explicit names and validate values before saving.

## Menus and popovers

- Group related actions, provide concise labels, and support keyboard navigation and Escape dismissal.
- Anchor popovers to their trigger without obscuring the current task; manage focus when opening and closing.
- Use a subtle shadow and small radius, but preserve contrast in both color schemes.

## Responsive and state guidance

- Treat the sidebar as proposed layout, not a fixed measurement; collapse it instead of squeezing the page.
- Support loading, empty, error, and permission-denied states.
- Respect reduced motion and the user's color-scheme preference. Verify contrast, focus order, and touch targets.
