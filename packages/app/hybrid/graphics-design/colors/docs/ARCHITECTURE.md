# Architecture

## Tech Stack

| Layer     | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 App Router (static export), React 19 |
| Language  | TypeScript strict                               |
| Styling   | Tailwind CSS 4 + DaisyUI 5 custom themes        |
| Desktop   | Tauri 2                                         |
| Testing   | Jest (+ React Testing Library) + Playwright     |

## Directory Structure

```txt
src/
├── app/
│   ├── (app)/              # 16 tool pages under (app)/<tool>/
│   └── (info)/             # About, Downloads, Version
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/          # Header
│   ├── templates/          # HomeTemplate, AboutTemplate, ...
│   └── tools/              # 16 self-contained color tool components
├── hooks/                  # useTheme, useClipboard, useSWRegister
├── lib/                    # colors.ts — pure color math API
├── providers/              # SWProvider
├── styles/                 # globals.css, base.css, themes.css
└── types/
```

## Routing

App Router with static export. Each of the 16 tools owns its own page under
`src/app/(app)/<tool>/`, so a tool is reachable at its own URL:

- `/` — home hub with tool-card grid
- `/converter`, `/adjuster`, `/wheel`, `/schemes`, `/contrast`
- `/shades-tints`, `/tint-shade-tone`, `/mixer`, `/temperature`
- `/gradient`, `/opacity`, `/color-blindness`, `/css-scale`
- `/palette`, `/random`, `/theme`
- `/about`, `/downloads`, `/version` — info pages

All routes prerender as static content.

## Theming

- Two custom DaisyUI v5 themes in `themes.css`: `colors-dark` (default) and
  `colors-light`
- `<html data-theme="colors-dark">` server-rendered; an inline script in
  `layout.tsx` reads `localStorage['colors:theme']` before first paint
- `useTheme` persists the choice under the `colors:theme` key

## Color Utilities

`src/lib/colors.ts` holds the pure, framework-free color math: parsing,
conversions (HEX/RGB/HSL/HSV/CMYK), luminance and WCAG contrast, harmony
generation, mixing, compositing, temperature mapping, and color-vision
simulation. Every tool imports from here — there is no duplicated color logic.

## Tauri Shell

`src-tauri/` mirrors the other hybrid apps. The desktop shell loads the static
export from `out/`, uses the generated `icons/` set, and builds platform bundles
via `pnpm tauri build`.
