# Workflow notes

Focused reference for **carbon-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

The authoritative list lives in `@carbon/themes` (`white.ts`, `g10.js`, `g90.ts`,
`g100.ts`). Check that package before quoting a token in a design doc.

---

## 3. Color Is Roles Over Values

This is the single most useful table on the Carbon site — it shows the same roles
holding across a light and a dark theme:

| Token             | Role              | White    | Gray 100 |
| ----------------- | ----------------- | -------- | -------- |
| `$background`     | Page background   | White    | Gray 100 |
| `$text-primary`   | Primary text      | Gray 100 | Gray 10  |
| `$text-secondary` | Label / secondary | Gray 70  | Gray 30  |
| `$border-strong`  | Strong border     | Gray 50  | Gray 60  |
| `$icon-primary`   | Primary icon      | Gray 100 | Gray 10  |
| `$field-01`       | Form field ground | Gray 10  | Gray 90  |

- `$interactive` resolves through to a palette token such as `$blue-60` in the
  default theme — role in, value out.
- Reference the role in components. `background: $background` themes itself;
  `background: #ffffff` does not.
- Interactive, support, success, warning, error, and disabled each have their own
  layer and token group. Reach for those, not for `gray-*`.

---

## 4. Typography Has Four Categories

| Category     | Use                                                   |
| ------------ | ----------------------------------------------------- |
| `productive` | UI: tables, forms, labels, buttons. The default voice |
| `editorial`  | Long-form reading, marketing and documentation pages  |
| `universal`  | Works in either context — headings across products    |
| `additional` | Supporting roles: code, captions, legal               |

IBM Plex Sans is the productive workhorse, IBM Plex Serif the editorial face, IBM
Plex Mono the additional face. Productive styles are deliberately tighter and
smaller than editorial ones; that difference is the reason a Carbon table looks
like a tool and not a document.

Verify exact sizes and tracking in the typography foundation before hard-coding
them — do not carry sizes across from another system.

---

## 5. Spacing and the 2x Grid

- Spacing is a **4px base with 2px half-steps**. Choose from the `$spacing-*`
  scale; do not invent a value.
- The 2x Grid is a 16-column layout at desktop, 8 at the intermediate breakpoint,
  4 at small, with a 16px gutter and 16px margin.
- Prefer the grid's span utilities over percentage widths or arbitrary flex ratios.
- Icons, checkboxes, and inline controls align to the same 4px rhythm as text — if
  something sits half a step off, it is nearly always a spacing-scale miss.

Read the current `$spacing-*` ladder out of `@carbon/themes` rather than reciting
step numbers from memory; the scale has grown increments over time.
