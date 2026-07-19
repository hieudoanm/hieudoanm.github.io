# References

A survey of how the major component ecosystems — DaisyUI, Material UI,
shadcn/ui, Tailwind UI, and Radix UI — handle components, styling, theming,
documentation, and distribution. It exists so agents can borrow ideas that fit
this boilerplate instead of guessing from memory. Findings are mapped to this
project's choices at the end.

## Why these five

Each one represents a distinct philosophy. This project already builds on
[DaisyUI](https://daisyui.com) + Tailwind CSS, so the others are studied as
comparison points:

| Library     | Distribution                      | Styling model       | Accessibility  | License    |
| ----------- | --------------------------------- | ------------------- | -------------- | ---------- |
| DaisyUI     | npm plugin                        | CSS utility classes | Partial        | MIT        |
| MUI         | npm package (`@mui/material`)     | CSS-in-JS + runtime | Strong         | MIT        |
| shadcn/ui   | Copy-paste via CLI/registry       | Tailwind utilities  | Strong (Radix) | MIT        |
| Tailwind UI | Paid copy-paste (`$299` one-time) | Tailwind utilities  | Good           | Commercial |
| Radix UI    | npm package (`@radix-ui/react-*`) | Unstyled primitives | Best-in-class  | MIT        |

## DaisyUI

A CSS-first component library layered on Tailwind CSS. Components are authored
as **class names** (`btn`, `card`, `badge`, `modal`) rather than JSX components,
so there is nothing to install beyond the plugin and no JavaScript runs at
runtime.

- **Styling**: each component class composes Tailwind utilities; variants are
  semantic colors (`btn-primary`, `badge-success`) and modifier classes
  (`btn-outline`, `input-bordered`). No inline styles, no `style` prop.
- **Theming**: CSS variables named per DaisyUI's v5 scheme (`--p`, `--pc`,
  `--b1`, ...) aligned to Tailwind v4's `--color-*` syntax (`--color-primary`,
  `--color-primary-content`, `--color-base-100`). Themes are applied via the
  `data-theme="night"` attribute on `<html>`, and the `themes` config option is
  a comma-separated list. v5 removed automatic `*-content` color derivation —
  content colors are now explicit.
- **Docs**: one page per component with markup examples, a table of class
  modifiers, and a copy-paste demo. Small, example-driven, no typed API surface.
- **Trade-offs**: no type safety or prop validation (class strings can silently
  do nothing), and accessible behavior (dialogs, dropdowns, tabs) must be
  hand-rolled in JS.
- **Borrowed here**: class-composition styling (this project's atoms use DaisyUI
  classes directly), `data-theme` switching on `<html>`, and semantic variant
  names for `Button`, `Badge`, and status indicators.

## MUI (Material UI)

A fully styled React component library with an imperative, prop-driven API and a
runtime theming engine.

- **Styling**: CSS-in-JS via `@mui/material/styles` and `emotion`. Theming is
  object-based — `createTheme({ palette, typography, breakpoints })` — passed
  through `<ThemeProvider theme={...}>`.
- **Theming (v7)**: with `cssVariables: true`, `createTheme` emits flattened CSS
  variables (e.g. `--mui-palette-primary-main`) plus color _channel_ tokens for
  translucent overlays; `theme.vars` mirrors the serializable theme so static
  code can reference design tokens. Component customization uses per-component
  `styleOverrides` (e.g. `MuiChip` → `MuiChip.root` with variants) and slot
  props (`components`, `slotProps`).
- **Docs**: the largest and most exhaustive of the five — full API reference per
  component (props tables with types, defaults, descriptions), live demos,
  design-token pages, migration guides.
- **Trade-offs**: heavyweight bundle, runtime style computation, and a strict
  opinionated look that is harder to reskin than utility classes.
- **Borrowed here**: the **props-table documentation format** used in `ATOMS.md`
  / `MOLECULES.md` / `ORGANISMS.md` (Prop / Type / Default / Description)
  mirrors MUI's API reference style. The token-variable idea maps to DaisyUI's
  CSS-variable themes.

## shadcn/ui

Not a library at all — a **registry of source files** copied directly into your
project via a CLI (`npx shadcn@latest add button`). There is no runtime
dependency; after install the component is _your_ code.

- **Distribution**: the CLI reads a `registry.json` manifest (a list of
  `registry-item` specs) that is served over HTTP or from a public GitHub repo.
  Frameworks beyond React (Next.js, Vite, Vue, Svelte, PHP) are supported by the
  same manifest format.
- **Styling**: components are authored with Tailwind utility classes and `cn()`
  (a `clsx` + `tailwind-merge` helper) so consumers can override classes without
  collisions. Styling and theming live in CSS variables.
- **Behavior**: every interactive primitive delegates to **Radix UI** for
  accessibility, focus management, and keyboard navigation.
- **Docs**: narrative "Install / Usage / Customization" pages per component with
  interactive demos; configuration is code-first (run the CLI, own the file).
- **Trade-offs**: no upgrade path — fixes arrive only by copying newer source
  over yours; every project carries a fork.
- **Borrowed here**: **colocated, source-owned components** (this repo keeps
  tests next to components and expects agents to read/write the source
  directly), and the `cn()` class-merge idea for composition-friendly atoms.

## Tailwind UI

A **paid, copy-paste** collection (now "Tailwind Plus", `$299` one-time for
lifetime access) of 500+ marketing, ecommerce, and dashboard components plus
full site templates built with React and Next.js.

- **Distribution**: browse a catalog, hit "Copy", paste the JSX/HTML into your
  project. No CLI, no package, no registry. Components ship in React, Vue, and
  vanilla HTML formats; interactive ones use Headless UI / Tailwind Elements.
- **Styling**: pure Tailwind utility classes designed by the Tailwind team — the
  reference aesthetic for hand-written Tailwind. Includes **Catalyst**, a React
  UI kit of drop-in application components.
- **Docs**: catalog pages with live previews and a "Copy" button; Catalyst has
  its own Getting Started guide (download a zip, copy `javascript`/`typescript`
  folders into your components directory, adapt the `Link` component to your
  router).
- **Trade-offs**: not open source, updates are manual re-copies, and the license
  restricts redistribution.
- **Borrowed here**: **hand-authored Tailwind class compositions** and the
  template-driven structure of this project's `templates/` and `pages/` levels.

## Radix UI

A collection of **unstyled, accessible React primitives** (`@radix-ui/react-*`).
Each package ships only behavior — state, focus management, keyboard navigation,
ARIA wiring — with no opinion about how it looks.

- **Composition**: components expose a single-child render-prop or `asChild`
  pattern so you compose styling freely (e.g. `<DropdownMenu.Root>` →
  `<DropdownMenu.Trigger asChild>`). The unified `radix-ui` package bundles all
  primitives.
- **Accessibility**: considered the reference implementation — WAI-ARIA
  compliance, full keyboard navigation, typeahead, focus trapping, RTL. This is
  why shadcn/ui and others build on it.
- **Docs**: per-primitive guides covering anatomy, states, keyboard
  interactions, and accessibility — behavior-first, deliberately thin on
  styling.
- **Trade-offs**: no styling at all; you must bring a design system, and
  behaviors live behind a multi-part composition API.
- **Borrowed here**: **behavior-first thinking** — interactive molecules
  (dialog, menu, tabs, slider) follow Radix-style anatomy (trigger, content,
  state), and accessibility requirements (keyboard navigation, focus management)
  are treated as part of the component contract.

## Comparison snapshot

| Concern        | DaisyUI                 | MUI                  | shadcn/ui         | Tailwind UI         | Radix UI           |
| -------------- | ----------------------- | -------------------- | ----------------- | ------------------- | ------------------ |
| Ships styles   | Yes (classes)           | Yes (CSS-in-JS)      | Yes (utilities)   | Yes (utilities)     | No                 |
| Ships behavior | No (JS required)        | Yes                  | Via Radix         | Via Headless UI     | Yes (primitives)   |
| Install model  | `npm i` + plugin        | `npm i`              | CLI copies source | Manual copy-paste   | `npm i`            |
| Customization  | Override classes/themes | Theme provider       | Edit owned source | Edit pasted classes | Compose wrappers   |
| Versioning     | Semver, CSS variables   | Semver, `theme.vars` | None (your fork)  | Lifetime license    | Per-package semver |
| Type safety    | None (class strings)    | Full TS              | Full TS           | JSX/TS snippets     | Full TS            |

## What this project takes

- **Styling = DaisyUI classes + Tailwind utilities** (like DaisyUI and Tailwind
  UI): cards are `card bg-base-200 border-base-content/10 border`, muted text is
  `text-base-content/50` — see [CONVENTIONS.md](CONVENTIONS.md).
- **Docs = MUI-style props tables**: every atom, molecule, and organism is
  documented in `ATOMS.md` / `MOLECULES.md` / `ORGANISMS.md` with a
  `Prop | Type | Default | Description` table.
- **Source ownership = shadcn/ui model**: components are checked into the repo
  with colocated tests, and agents edit source directly instead of layering
  overrides.
- **Behavior = Radix-inspired anatomy**: interactive molecules own their
  keyboard/focus behavior and document their accessibility contract.
- **Theming = DaisyUI `data-theme` CSS variables** on `<html>`, keeping the
  MUI-style token idea without the runtime engine.

---

[Back to index](README.md)
