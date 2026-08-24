# Features

> Chemistry — Interactive periodic table and chemistry tools as a hybrid
> web/desktop app.

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/chemistry`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `chemistry` theme (light default) with
  `chemistry-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the tool with icon and description
- Tool route opened from home inside the shared `ToolTemplate`
- Theme toggle in template header; choice persisted in localStorage

## Periodic Table

- Interactive periodic table rendered from
  `@hieudoanm.github.io/data/periodic-table`
- Elements color-coded by `specificName` category
- Filter buttons to highlight specific element categories
- Desktop: 18-column CSS grid layout
- Mobile: 3-column card grid layout
- Responsive design adapts between breakpoints
