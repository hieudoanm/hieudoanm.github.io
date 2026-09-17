# Components

Component inventory implemented in `internal/gui` (fyne) and mirrored in the
HTML prototypes under `prototypes/html/`:

| Component                      | fyne widget                                                                | HTML prototype                      |
| ------------------------------ | -------------------------------------------------------------------------- | ----------------------------------- |
| App bar / title bar            | `app.NewWindow` title + `SetTitle` (`kevin — Key/Value (N keys)`)          | `01-gui.html` (window chrome)       |
| Control bar                    | `controlLayout` (count, key input, value input, Save, Refresh, Delete all) | `01-gui.html`                       |
| Key/value table                | `widget.Table` with `flexTable` (No, Key, Value, Edit/Copy/Delete)         | `01-gui.html`                       |
| Status bar                     | `widget.Label` (trailing, low importance)                                  | `01-gui.html`                       |
| Confirm dialog                 | `dialog.ShowConfirm`                                                       | `01-gui.html` (Delete / Delete all) |
| Buttons                        | `widget.Button` with High/Danger importance                                | `00-components.html`                |
| Chips                          | —                                                                          | `00-components.html`                |
| Cards                          | `widget.NewCard`                                                           | `00-components.html`                |
| Text fields                    | `widget.Entry`                                                             | `00-components.html`                |
| States (loading, empty, error) | status label / empty table                                                 | `00-components.html`                |

## Colour roles (Material Design 3)

Primary `#6750A4` / on-primary `#FFFFFF` / primary-container `#EADDFF`; secondary
`#625B71` / secondary-container `#E8DEF8`; tertiary `#7D5260` / tertiary-container
`#FFD8E4`; error `#B3261E` / error-container `#F9DEDC`; surface `#FFFFFF` /
on-surface `#1D1B20`; background `#FBF9FE`; outline `#79747E`. Dark variant uses
the MD3 dark surface (`#1C1B1F`) with elevated primary (`#D0BCFF`).

## Type scale

display-large (57px), headline-large (32px), title-large (22px), body-large
(16px), body-medium (14px), body-small (12px), label-large (14px), label-medium
(12px), label-small (11px).

## Shape tokens

small 4dp, medium 12dp, large 16dp, extra-large 28dp.
