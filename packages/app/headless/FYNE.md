# FYNE — Desktop GUI Design Reference

Shared design conventions for the fyne desktop GUIs under `packages/app/headless`
(KeVIN `serve --gui`, Landify `studio`). This file owns the theme contract, the
colour roles, the spacing tokens, and the layout rules; each app implements them
in its `internal/gui`. App-specific screens and behaviour live in the app's own
`docs/07-ui-ux-design.md`.

## 1. Build rules

- The window lives behind the `gui` build tag so default builds stay CGO-free:
  `gui_fyne.go` (`//go:build gui`) is the real window, `gui.go`
  (`//go:build !gui`) is a stub whose `Run` returns `ErrUnavailable`.
- `make build-gui` links the window (`-tags gui`, CGO enabled); every other
  target (`make build`, `make test`, CI) compiles the stub.
- Logic that does not need fyne stays outside the tag so it is unit-tested in
  the default build (Landify: `doc.go`, `nodeops.go`, `schema.go`, `wcag.go`
  never import fyne).

## 2. Theme contract

One empty struct, `appTheme{}`, in `internal/gui/theme.go`, installed once with
`a.Settings().SetTheme(appTheme{})`:

| Method  | Rule                                                                                                                                                                                      |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Color` | Branch on the `fyne.ThemeVariant` argument (`VariantLight` / `VariantDark`) for every role this app overrides; **fall back** to `theme.DefaultTheme().Color(name, v)` for everything else |
| `Size`  | Override only the spacing tokens below; text, icon and input-border sizes stay default                                                                                                    |
| `Font`  | Defer to `theme.DefaultTheme().Font(s)` — no bundled font assets                                                                                                                          |
| `Icon`  | Defer to `theme.DefaultTheme().Icon(n)` — stock fyne icons only                                                                                                                           |

- Never read the OS variant inside `Color` — the `v` parameter is the variant;
  pass it through. Objects that are not theme-painted (hand-drawn `canvas.Line`,
  custom renderers) read it from `fyne.CurrentApp().Settings().ThemeVariant()`.
- No global state: the theme is a value type with no fields, so light/dark
  switching is entirely fyne's `Settings().ThemeVariant()`.

## 3. Colour roles

Both variants are mandatory; a GUI must not assume light is the only theme.

| Role               | Meaning                                         | Light     | Dark      |
| ------------------ | ----------------------------------------------- | --------- | --------- |
| `background`       | Window and card surface                         | `#F7F7F9` | `#1A1A1E` |
| `primary`          | Filled actions (Save), focus, selection         | `#3B7DD8` | `#4F9CFF` |
| `foreground`       | Body text                                       | `#1A1A1E` | `#E8E8EC` |
| `input-background` | Entry fields                                    | `#FFFFFF` | `#26262C` |
| `disabled`         | Muted captions, low-importance status text      | `#6B6B75` | `#9A9AA5` |
| `separator`        | Hairlines, table grid, hand-drawn borders       | `#E8EBF0` | `#1F2029` |
| `error`            | Destructive/danger actions, validation failures | `#D64545` | `#FF5C5C` |
| `success`          | Confirmation feedback                           | `#2FA968` | `#4FD68C` |

Roles not listed here fall back to the fyne default theme. Semantic meaning is
colour **plus** text/icon — never colour alone (a destructive button also says
what it deletes; the status bar writes `deleted <key>` rather than flashing
green).

`ColorNameButton` is deliberately **not** overridden: a `Medium`-importance
button keeps fyne's neutral surface (light `#F5F5F5`, dark `#28292E`), which
reads as a quiet neutral on the custom background rather than a second accent.

## 4. Size tokens

Wider spacing than the fyne default for a calmer desktop layout; scrollbars are
unified at one slimmer value; everything not listed keeps the default value.

| Token                    | Value | Default (fyne v2.8.2) |
| ------------------------ | ----- | --------------------- |
| `SizeNamePadding`        | 8     | 4                     |
| `SizeNameInnerPadding`   | 12    | 8                     |
| `SizeNameScrollBar`      | 10    | 12                    |
| `SizeNameScrollBarSmall` | 10    | 3                     |
| `SizeNameInputBorder`    | 1     | 1 (unchanged)         |

## 5. Layout and widgets

- **Window** — descriptive title (`kevin — Key/Value`), live count appended by
  the render loop (`kevin — Key/Value (N keys)`); one padded, resizable window.
- **Surface** — content sits in a single `widget.NewCard`; bands inside it:
  control bar → table/list → status bar, separated by `separator` rules.
- **Control bar** — column-aligned with the table below it (KeVIN's
  `controlLayout` shares `columnWidths` with `flexTable`), so inputs line up
  with Key/Value and buttons line up with the per-row actions.
- **Button importance → role**: `High` → primary (filled), `Danger` → error
  (filled), `Medium` (default) → neutral `ColorNameButton` (the fallback
  above), `Low` → text-only. The MD3 HTML previews render the default button
  as the tonal variant.
- **Status bar** — one trailing-aligned `LowImportance` label; the message is
  written **after** the mutation succeeds (`set <key>`, `deleted <key>`), never
  optimistically.
- **Destructive actions** always go through `dialog.ShowConfirm` (single row
  and delete-all alike).
- **Lists** truncate long values in the cell (KeVIN: 80 runes + `…`); the full
  value loads into the editor.

## 6. Accessibility

- **Text contrast ≥ 4.5:1 on `background`** in both variants — verified for the
  palette above: light foreground 16.2:1, light muted 4.9:1, dark foreground
  14.2:1, dark muted 6.2:1.
- Accent roles are held to the 3:1 UI-component bar (light primary 3.8:1, light
  error 4.1:1, dark primary 6.2:1, dark error 5.7:1). Known gap: light
  `success` is 2.8:1 on the light background — reserve it for icons and badges
  ≥ 18.66px bold, or darken it before using it as small text.
- **Icon-only controls** — fyne names an empty-text button by its icon
  resource (`Button.AccessibilityLabel` falls back to `b.Icon.Name()`), which
  identifies the icon, not the action or row (`Edit <key>`). Pass visible text
  where it fits, and treat the per-row `aria-label`s of the HTML previews as
  the naming target.
- Focus is visible (fyne paints `ColorNameFocus`/`ColorNameHover` blends) and
  follows the control order — key entry → value entry → Save.
- Long content never truncates without the full value being reachable (table
  cell truncates, editor shows everything).

## 7. HTML prototypes

Each app's `docs/07-ui-ux-design/prototypes/html/` previews the same structure
interactively in **Material Design 3** (light + dark, `sml-theme` toggle).
Roles match this reference — primary, error, success, muted — while hex values
differ: fyne paints with the palette in §3, the web previews with MD3 tokens.
When either side changes a role, update both and this file.

## Cross-references

- KeVIN theme: [`kevin/languages/go/internal/gui/theme.go`](./kevin/languages/go/internal/gui/theme.go)
- KeVIN UI/UX design: [`kevin/languages/go/docs/07-ui-ux-design.md`](./kevin/languages/go/docs/07-ui-ux-design.md)
- Landify studio GUI: [`landify/languages/go/internal/gui/`](./landify/languages/go/internal/gui/)
- Fyne theming docs: <https://docs.fyne.io/theme/>
